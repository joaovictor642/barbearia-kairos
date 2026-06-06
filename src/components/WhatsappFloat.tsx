import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5511947790902?text=Ol%C3%A1,%20encontrei%20o%20site%20da%20Barbearia%20Kairos%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio";

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa direta no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[var(--whatsapp)] opacity-40 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-[var(--whatsapp)] flex items-center justify-center animate-float-pulse">
          <MessageCircle className="w-7 h-7 text-white" fill="white" strokeWidth={0} />
        </div>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap glass px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Agende seu horário 💈
        </div>
      </div>
    </a>
  );
}
