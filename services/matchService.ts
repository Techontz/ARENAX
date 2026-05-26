export const fetchLiveMatches =
  async () => {
    try {
      const response =
        await fetch(
          '/api/live-matches'
        );

      if (!response.ok) {
        throw new Error(
          'Failed to fetch matches'
        );
      }

      const data =
        await response.json();

      return data.events || [];
    } catch (error) {
      console.error(
        'MATCH FETCH ERROR:',
        error
      );

      return [];
    }
  };