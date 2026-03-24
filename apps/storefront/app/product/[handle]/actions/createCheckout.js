"use server";

import { redirect } from "next/navigation";
import { createCheckout } from "@/lib/shopify";

export async function createCheckoutAction(formData) {
  const variantId = formData.get("variantId");

  if (!variantId || typeof variantId !== "string") {
    throw new Error("A purchasable product variant is required.");
  }

  const checkoutUrl = await createCheckout(variantId);
  redirect(checkoutUrl);
}
