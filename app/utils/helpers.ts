/**
 * Format minutes to HH:MM format
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
};

/**
 * Format price to display
 */
export const formatPrice = (price: number | "Free"): string => {
  if (price === "Free") {
    return "Free";
  }
  
  return `$${price.toFixed(2)}`;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (
  completedChapters: string[],
  totalChapters: number
): number => {
  if (totalChapters === 0) return 0;
  return Math.round((completedChapters.length / totalChapters) * 100);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate random avatar URL (for demo purposes)
 */
export const getRandomAvatar = (seed: string): string => {
  return `https://i.pravatar.cc/150?u=${seed}`;
};
