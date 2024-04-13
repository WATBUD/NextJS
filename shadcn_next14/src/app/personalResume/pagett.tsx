import fs from 'fs';
import path from 'path';
import React from 'react';
import { GetStaticProps } from 'next';

// interface ResumeProps {
//   resumeContent: string;
// }

// const ResumePage: React.FC<ResumeProps> = ({ resumeContent }) => {
//   return (
//     <div dangerouslySetInnerHTML={{ __html: resumeContent }} />
//   );
// };

// export const getStaticProps: GetStaticProps = async ({ params }: any) => {
//   const { index } = params;
//   const filePath = path.join(process.cwd(), 'resume', `${index}.html`);
//   const fileContent = fs.readFileSync(filePath, 'utf8');

//   return {
//     props: {
//       resumeContent: fileContent,
//     },
//   };
// };

// export default ResumePage;
