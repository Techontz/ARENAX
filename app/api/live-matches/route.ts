// import { NextResponse } from 'next/server';
// export const runtime = 'edge';

// export async function GET() {
//   try {
//     const response =
//       await fetch(
//         'https://www.sofascore.com/api/v1/sport/football/events/live',
//         {
//           method: 'GET',

//           headers: {
//             accept:
//               'application/json, text/plain, */*',

//             'accept-language':
//               'en-US,en;q=0.9',

//             'cache-control':
//               'no-cache',

//             pragma:
//               'no-cache',

//             referer:
//               'https://www.sofascore.com/',

//             origin:
//               'https://www.sofascore.com',

//             'user-agent':
//               'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
//           },

//           cache: 'no-store',
//         }
//       );

//     if (!response.ok) {
//       return NextResponse.json(
//         {
//           error:
//             'Failed to fetch live matches',
//         },
//         {
//           status:
//             response.status,
//         }
//       );
//     }

//     const data =
//       await response.json();

//     return NextResponse.json(
//       data
//     );
//   } catch (error) {
//     console.error(
//       'SOFASCORE ERROR:',
//       error
//     );

//     return NextResponse.json(
//       {
//         error:
//           'Server error',
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }