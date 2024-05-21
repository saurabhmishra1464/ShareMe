import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId:"c7wq1c1i",
  dataset: 'production',
  apiVersion: '2024-05-20',
  useCdn: true,
  token: "sk27o6KmhYGKIc0uNLuhQr8qKW1cOS8CCDxGveLiGALYris0nU3OhRY7t4KPSA2wsjuDhMq3Uc2NM33iOGOcuFizCd46jlIfPpParItHu7VyVA7RmxH9fp2BF2G6XT1VQ6L1OLJsXH7aRxFOJxRexUvEluejjXIU3moR63nUmmTYcEdnEXIK",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);