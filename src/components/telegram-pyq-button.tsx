import { Button } from "@/components/ui/button";

// Single source of truth for the Telegram PYQs invite link — change it here
// and every semester/course PYQs section updates at once.
export const TELEGRAM_PYQ_URL = "https://t.me/+Y2Y_BXW3oPdiY2Fl";

export function TelegramPYQButton() {
  return (
    <Button
      asChild
      className="w-full gap-2 bg-[#16a34a] font-bold text-white shadow-soft hover:bg-[#15803d] sm:w-auto"
    >
      <a
        href={TELEGRAM_PYQ_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get PYQs from Telegram (opens in a new tab)"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.13l-2.02 9.52c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.38-.12l-7.04 4.43-3.03-.95c-.66-.21-.67-.66.14-.98l11.83-4.56c.55-.2 1.03.13.85.96z" />
        </svg>
        Get PYQs From telegram
      </a>
    </Button>
  );
}
