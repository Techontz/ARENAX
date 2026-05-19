const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPID_API_HOST;

export const fetchLiveMatches = async () => {
  try {
    const response = await fetch(
      'https://sportapi7.p.rapidapi.com/api/v1/sport/football/events/live',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY!,
          'x-rapidapi-host': API_HOST!,
        },
      }
    );

    if (!response.ok) {
        const errorText = await response.text();
      
        console.error(
          'API ERROR:',
          response.status,
          errorText
        );
      
        return;
      }
      
      const data = await response.json();
      
      console.log('API DATA:', data);

    return data.events || [];
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
};