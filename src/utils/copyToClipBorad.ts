import { notification } from "antd";

export default function copyToClipborad(value: string | number) {
  // Copy the text inside the text field
  navigator.clipboard.writeText(value.toString());
  notification.success({
    message: "Copied to clipborad!",
  });
}
