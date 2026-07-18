import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(_request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { data: plan } = await supabase
      .from("user_plans")
      .select("subscription_plan, subscription_expires_at, subscription_cancelled_at")
      .eq("user_id", user.id)
      .single();

    if (!plan?.subscription_plan || !plan.subscription_expires_at) {
      return Response.json({ error: "No active subscription" }, { status: 400 });
    }
    if (plan.subscription_cancelled_at) {
      return Response.json({ error: "Already cancelled" }, { status: 400 });
    }

    await supabase
      .from("user_plans")
      .update({
        subscription_cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    return Response.json({
      ok: true,
      expires_at: plan.subscription_expires_at,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cancel error";
    return Response.json({ error: message }, { status: 500 });
  }
}
