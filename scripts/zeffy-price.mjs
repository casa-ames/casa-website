const asArray = (value) => Array.isArray(value) ? value : [];

const money = (amountInCents, currency = 'usd') => {
  const amount = Number(amountInCents) / 100;
  if (!Number.isFinite(amount)) return null;
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase(),
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCampaignPrice = (campaign) => {
  const rates = asArray(campaign?.rates).filter((rate) => !rate?.is_add_on);
  if (!rates.length) return 'See registration';

  const currency = rates.find((rate) => rate?.currency)?.currency ?? campaign?.currency ?? 'usd';
  const payWhatYouCanRates = rates.filter((rate) => rate?.is_pay_what_you_can);
  if (payWhatYouCanRates.length) {
    const minimums = payWhatYouCanRates
      .map((rate) => Number(rate?.pay_what_you_can_minimum_amount ?? 0))
      .filter(Number.isFinite);
    const minimum = minimums.length ? Math.min(...minimums) : 0;
    const formattedMinimum = money(minimum, currency);
    return minimum > 0 && formattedMinimum
      ? `Pay what you can (from ${formattedMinimum})`
      : 'Pay what you can';
  }

  const amounts = rates.map((rate) => Number(rate?.amount)).filter(Number.isFinite);
  if (!amounts.length) return 'See registration';
  const minimum = Math.min(...amounts);
  const maximum = Math.max(...amounts);
  const minimumLabel = money(minimum, currency);
  const maximumLabel = money(maximum, currency);
  if (!minimumLabel || !maximumLabel) return 'See registration';
  return minimum === maximum ? minimumLabel : `${minimumLabel}–${maximumLabel}`;
};
