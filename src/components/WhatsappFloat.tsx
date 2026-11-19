import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/links";

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar horário pelo WhatsApp"
      className="whatsapp-float"
    >
      <span className="whatsapp-label">Vamos marcar?</span>
      <MessageCircle size={25} strokeWidth={1.7} />
    </a>
  );
}
