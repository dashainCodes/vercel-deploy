import { format } from "date-fns";

export const formatDate = (dateTimeString:string) => {
  if (!dateTimeString) {
    return ""; // Return empty string if dateTimeString is empty or null
  }

  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      return ""; // Return empty string if date is invalid
    }

    return format(date, "MMMM d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return ""; // Return empty string if there's an error
  }
};