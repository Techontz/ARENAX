import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response =
      await fetch(
        'https://www.sofascore.com/api/v1/sport/football/scheduled-events/today',
        {
          method: 'GET',

          headers: {
            accept:
              'application/json, text/plain, */*',

            'accept-language':
              'en-US,en;q=0.9',

            referer:
              'https://www.sofascore.com/',

            origin:
              'https://www.sofascore.com',

            'user-agent':
              'Mozilla/5.0',
          },

          cache: 'no-store',
        }
      );

    const data =
      await response.json();

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          'Failed to fetch upcoming matches',
      },
      {
        status: 500,
      }
    );
  }
}