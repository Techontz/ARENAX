import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response =
      await fetch(
        'https://www.sofascore.com/api/v1/sport/football/events/live',
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0',
          },

          next: {
            revalidate: 120,
          },
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
          'Failed to fetch live matches',
      },
      {
        status: 500,
      }
    );
  }
}