import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServerClient } from "@supabase/ssr";

export async function DELETE(request: NextRequest) {
  try {
    // Verify user is authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    // Admin client with service role to bypass RLS
    const admin = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    // Delete all user data before removing auth record
    await Promise.all([
      admin.from("user_plans").delete().eq("user_id", userId),
      admin.from("user_reports").delete().eq("user_id", userId),
      admin.from("test_results").delete().eq("user_id", userId),
      admin.from("payments").delete().eq("user_id", userId),
    ]);

    // Delete auth user (cascades any remaining references)
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) {
      console.error("[delete-user] Auth deletion failed:", error);
      return Response.json({ error: "Failed to delete account" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
