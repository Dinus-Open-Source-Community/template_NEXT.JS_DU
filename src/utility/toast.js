'use client'

import { addToast } from "@heroui/react";

export function showToast({ success = true, message = "" }) {
  addToast({
    title: success ? "Success" : "Error",
    description: message,
    timeout: 3000,
    shouldShowTimeoutProgress: true,
    color: success ? "success" : "danger",
  });
}