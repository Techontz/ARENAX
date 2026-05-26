import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const response =
      await fetch(
        'https://www.sofascore.com/api/v1/sport/football/events/live',
        {
          headers: {
            accept:
              'application/json',

            referer:
              'https://www.sofascore.com/',

            'user-agent':
              'Mozilla/5.0',
          },

          cache: 'no-store',
        }
      );

    const text =
      await response.text();

    return new Response(
      text,
      {
        status: 200,

        headers: {
          'content-type':
            'application/json',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          'Failed to fetch',
      },
      {
        status: 500,
      }
    );
  }
}