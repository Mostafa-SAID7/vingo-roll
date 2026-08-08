/**
 * Validation utilities for forms and data
 * All validation logic in one place, no duplication
 */

import { REGEX, LIMITS, ERROR_MESSAGES } from "./constants";

// ============================================================================
// AUTH VALIDATION
// ============================================================================

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email.trim()) {
    return { valid: false, error: ERROR_MESSAGES.VALIDATION.INVALID_EMAIL };
  }
  if (!REGEX.EMAIL.test(email)) {
    return { valid: false, error: ERROR_MESSAGES.VALIDATION.INVALID_EMAIL };
  }
  if (email.length > LIMITS.MAX_EMAIL_LENGTH) {
    return { valid: false, error: "Email is too long" };
  }
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) {
    return { valid: false, error: "Password required" };
  }
  if (password.length < LIMITS.MIN_PASSWORD_LENGTH) {
    return { valid: false, error: ERROR_MESSAGES.AUTH.PASSWORD_TOO_SHORT };
  }
  return { valid: true };
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string,
): { valid: boolean; error?: string } {
  if (password !== confirmPassword) {
    return { valid: false, error: ERROR_MESSAGES.AUTH.PASSWORDS_DONT_MATCH };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name.trim()) {
    return { valid: false, error: "Name required" };
  }
  if (name.length > LIMITS.MAX_NAME_LENGTH) {
    return { valid: false, error: "Name is too long" };
  }
  return { valid: true };
}

// ============================================================================
// ADDRESS VALIDATION
// ============================================================================

export function validateAddress(address: {
  firstName?: string;
  lastName?: string;
  street1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!address.firstName?.trim()) errors["firstName"] = "First name required";
  if (!address.lastName?.trim()) errors["lastName"] = "Last name required";
  if (!address.street1?.trim()) errors["street1"] = "Address required";
  if (!address.city?.trim()) errors["city"] = "City required";
  if (!address.state) errors["state"] = "State required";
  if (!address.postalCode?.trim()) {
    errors["postalCode"] = "ZIP code required";
  } else if (!REGEX.ZIP_CODE.test(address.postalCode)) {
    errors["postalCode"] = ERROR_MESSAGES.VALIDATION.INVALID_ZIP;
  }
  if (!address.phone?.trim()) {
    errors["phone"] = "Phone number required";
  } else if (!REGEX.PHONE.test(address.phone)) {
    errors["phone"] = ERROR_MESSAGES.VALIDATION.INVALID_PHONE;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// ============================================================================
// PAYMENT VALIDATION
// ============================================================================

export function validateCardNumber(cardNumber: string): { valid: boolean; error?: string } {
  const clean = cardNumber.replace(/\s/g, "");
  if (!REGEX.CREDIT_CARD.test(clean)) {
    return { valid: false, error: ERROR_MESSAGES.VALIDATION.INVALID_CARD };
  }
  return { valid: true };
}

export function validateCardholderName(name: string): { valid: boolean; error?: string } {
  if (!name.trim()) {
    return { valid: false, error: "Cardholder name required" };
  }
  return { valid: true };
}

export function validateExpiry(expiry: string): { valid: boolean; error?: string } {
  if (!REGEX.EXPIRY.test(expiry)) {
    return { valid: false, error: ERROR_MESSAGES.VALIDATION.INVALID_EXPIRY };
  }

  const [month, year] = expiry.split("/");
  const monthNum = parseInt(month || "0", 10);

  if (monthNum < 1 || monthNum > 12) {
    return { valid: false, error: "Invalid month" };
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  const cardYear = parseInt(year || "0", 10);

  if (cardYear < currentYear || (cardYear === currentYear && monthNum < currentMonth)) {
    return { valid: false, error: "Card expired" };
  }

  return { valid: true };
}

export function validateCVC(cvc: string): { valid: boolean; error?: string } {
  if (!REGEX.CVC.test(cvc)) {
    return { valid: false, error: ERROR_MESSAGES.VALIDATION.INVALID_CVC };
  }
  return { valid: true };
}

// ============================================================================
// SEARCH & QUERY VALIDATION
// ============================================================================

export function validateSearchQuery(query: string): { valid: boolean; error?: string } {
  if (!query.trim()) {
    return { valid: false, error: "Search query required" };
  }
  if (query.length > LIMITS.MAX_SEARCH_QUERY_LENGTH) {
    return { valid: false, error: `Query too long (max ${LIMITS.MAX_SEARCH_QUERY_LENGTH} chars)` };
  }
  return { valid: true };
}

// ============================================================================
// PRICE VALIDATION
// ============================================================================

export function validatePrice(price: number): { valid: boolean; error?: string } {
  if (typeof price !== "number" || isNaN(price)) {
    return { valid: false, error: "Invalid price" };
  }
  if (price < LIMITS.MIN_PRICE) {
    return { valid: false, error: "Price must be positive" };
  }
  if (price > LIMITS.MAX_PRICE) {
    return { valid: false, error: `Price cannot exceed ${LIMITS.MAX_PRICE}` };
  }
  return { valid: true };
}

export function validatePriceRange(min: number, max: number): { valid: boolean; error?: string } {
  const minValidation = validatePrice(min);
  if (!minValidation.valid) return minValidation;

  const maxValidation = validatePrice(max);
  if (!maxValidation.valid) return maxValidation;

  if (min > max) {
    return { valid: false, error: "Min price cannot be greater than max price" };
  }

  return { valid: true };
}

// ============================================================================
// QUANTITY VALIDATION
// ============================================================================

export function validateQuantity(quantity: number): { valid: boolean; error?: string } {
  if (!Number.isInteger(quantity)) {
    return { valid: false, error: "Quantity must be a whole number" };
  }
  if (quantity < 1) {
    return { valid: false, error: "Quantity must be at least 1" };
  }
  if (quantity > 20) {
    return { valid: false, error: "Quantity cannot exceed 20" };
  }
  return { valid: true };
}

// ============================================================================
// SLUG VALIDATION
// ============================================================================

export function validateSlug(slug: string): { valid: boolean; error?: string } {
  if (!REGEX.URL_SLUG.test(slug)) {
    return { valid: false, error: "Invalid slug format" };
  }
  return { valid: true };
}

// ============================================================================
// BATCH VALIDATION (Multiple fields)
// ============================================================================

export function validateLoginForm(data: { email?: string; password?: string }): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(data.email ?? "");
  if (!emailValidation.valid) errors["email"] = emailValidation.error!;

  const passwordValidation = validatePassword(data.password ?? "");
  if (!passwordValidation.valid) errors["password"] = passwordValidation.error!;

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateSignupForm(data: {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(data.email || "");
  if (!emailValidation.valid) errors["email"] = emailValidation.error!;

  const nameValidation = validateName(data.name || "");
  if (!nameValidation.valid) errors["name"] = nameValidation.error!;

  const passwordValidation = validatePassword(data.password || "");
  if (!passwordValidation.valid) errors["password"] = passwordValidation.error!;

  if (data.password) {
    const matchValidation = validatePasswordMatch(data.password, data.confirmPassword || "");
    if (!matchValidation.valid) errors["confirmPassword"] = matchValidation.error!;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validatePaymentForm(data: {
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvc?: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const cardValidation = validateCardNumber(data.cardNumber || "");
  if (!cardValidation.valid) errors["cardNumber"] = cardValidation.error!;

  const nameValidation = validateCardholderName(data.cardName || "");
  if (!nameValidation.valid) errors["cardName"] = nameValidation.error!;

  const expiryValidation = validateExpiry(data.expiry || "");
  if (!expiryValidation.valid) errors["expiry"] = expiryValidation.error!;

  const cvcValidation = validateCVC(data.cvc || "");
  if (!cvcValidation.valid) errors["cvc"] = cvcValidation.error!;

  return { valid: Object.keys(errors).length === 0, errors };
}
