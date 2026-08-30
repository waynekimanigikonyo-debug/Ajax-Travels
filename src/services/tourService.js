const fallbackDestinations = [
  {
    id: 'maasai-mara',
    name: 'Maasai Mara',
    country: 'Kenya',
    location: 'Narok, Kenya',
    image:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    description:
      'Wildlife safaris, game drives and unforgettable African landscapes.',
    price: 'From KES 45,000',
  },

  {
    id: 'diani',
    name: 'Diani Beach',
    country: 'Kenya',
    location: 'Kwale, Kenya',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    description:
      'White sand beaches, warm water and coastal adventures.',
    price: 'From KES 32,000',
  },

  {
    id: 'zanzibar',
    name: 'Zanzibar',
    country: 'Tanzania',
    location: 'Zanzibar, Tanzania',
    image:
      'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1000&q=80',
    description:
      'Tropical beaches, Stone Town and island experiences.',
    price: 'From USD 150',
  },

  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    location: 'Cape Town, South Africa',
    image:
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=80',
    description:
      'Mountains, beaches, food, culture and wine-country escapes.',
    price: 'From USD 210',
  },

  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    location: 'Dubai, UAE',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    description:
      'Luxury hotels, desert adventures and unforgettable city experiences.',
    price: 'From USD 500',
  },
];

async function api(path, options = {}) {
  const response = await fetch(path, options);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || 'Travel service request failed.'
    );
  }

  return data;
}

export async function searchExperiences(query) {
  try {
    const data = await api(
      `/api/experiences?query=${encodeURIComponent(query)}`
    );

    return (data.data || []).map((item) => ({
      id: item.id,
      name: item.name,
      shortDescription:
        item.shortDescription ||
        item.description ||
        'Explore this local experience.',
      location: item.location || query,
      rating: item.rating,
      picture:
        item.pictures?.[0] ||
        item.picture ||
        '',
      price:
        item.price?.amount ||
        item.price ||
        '',
      currency:
        item.price?.currencyCode ||
        item.currency ||
        '',
      bookingLink:
        item.bookingLink ||
        '',
      demo: false,
    }));
  } catch (error) {
    console.warn(
      'Experience API unavailable. Using demo destinations.',
      error
    );

    return fallbackDestinations
      .filter((destination) =>
        `${destination.name} ${destination.country}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .map((destination) => ({
        id: destination.id,
        name: `${destination.name} Experience`,
        shortDescription: destination.description,
        location: destination.location,
        rating: '4.8',
        picture: destination.image,
        price:
          destination.id === 'diani'
            ? '32000'
            : destination.id === 'maasai-mara'
              ? '45000'
              : destination.id === 'zanzibar'
                ? '150'
                : '210',
        currency:
          destination.id === 'maasai-mara' ||
          destination.id === 'diani'
            ? 'KES'
            : 'USD',
        bookingLink: '',
        demo: true,
      }));
  }
}

export async function searchStays(query, options = {}) {
  const params = new URLSearchParams({
    query,
    checkInDate: options.checkInDate || '',
    checkOutDate: options.checkOutDate || '',
    adults: String(options.adults || 2),
  });

  try {
    const data = await api(
      `/api/stays?${params.toString()}`
    );

    return data.data || [];
  } catch (error) {
    console.warn(
      'Hotel API unavailable. Using demo stays.',
      error
    );

    return fallbackDestinations
      .filter((destination) =>
        `${destination.name} ${destination.country}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .map((destination) => ({
        id: destination.id,
        name: `${destination.name} Stay`,
        location: destination.location,
        rating: '4.7',
        picture: destination.image,
        price:
          destination.id === 'diani'
            ? '32000'
            : destination.id === 'maasai-mara'
              ? '45000'
              : destination.id === 'zanzibar'
                ? '150'
                : '210',
        currency:
          destination.id === 'maasai-mara' ||
          destination.id === 'diani'
            ? 'KES'
            : 'USD',
        demo: true,
      }));
  }
}

export function fetchFeaturedDestinations() {
  return fallbackDestinations;
}