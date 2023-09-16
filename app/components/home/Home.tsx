import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Center, Divider, Link, useColorModeValue } from '@chakra-ui/react';
import type { LinksFunction } from '@remix-run/node';

import AvatarImage from '~/assets/image/avatar.jpeg';
import Avatar, { links as avatarLinks } from '~/components/home/Avatar';
import Name from '~/components/home/Name';
import styles from '~/styles/components/home.css';

export const links: LinksFunction = () => {
  return [
    ...avatarLinks(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

const Separator = () => {
  return (
    <Center>
      <div className="w-40">
        <Divider size="sm" orientation="horizontal" />
      </div>
    </Center>
  );
};

export default function Home() {
  const names = ['Slinvent', 'Ryo Shen', 'Lingwei Shen'];
  const skills = [
    {
      label: 'java',
      img: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white',
    },
    {
      label: 'spring',
      img: 'https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white',
    },
    {
      label: 'openapi',
      img: 'https://img.shields.io/badge/openapi-%236BA539.svg?style=for-the-badge&logo=openapiinitiative&logoColor=white',
    },
    {
      label: 'mysql',
      img: 'https://img.shields.io/badge/mysql-%23507E9C.svg?style=for-the-badge&logo=mysql&logoColor=white',
    },
    {
      label: 'typescript',
      img: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
    },
    {
      label: 'vue',
      img: 'https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D',
    },
    {
      label: 'tailwind-css',
      img: 'https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
    },
    {
      label: 'react',
      img: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
    },
    {
      label: 'remix',
      img: 'https://img.shields.io/badge/remix-%23000.svg?style=for-the-badge&logo=remix&logoColor=white',
    },
    {
      label: 'git',
      img: 'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white',
    },
    {
      label: 'docker',
      img: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white',
    },
    {
      label: 'intellij-idea',
      img: 'https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white',
    },
    {
      label: 'webstorm',
      img: 'https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black',
    },
  ];

  const blackTextColor = useColorModeValue('text-black', 'text-white');
  const highlight = `font-bold ${blackTextColor}`;

  return (
    <Box className="space-y-4">
      <div className="flex flex-row items-center space-x-8">
        <Avatar imgUrl={AvatarImage} fallback="Ryo" size="lg" />
        <div className="smiley-sans">
          <Name className={`text-3xl ${highlight}`} values={names} />
          <p>Software Developer / Shanghai</p>
        </div>
      </div>
      <p className="pt-4">
        Hi 👋, I'm <span className={highlight}>Slinvent</span>, a curious{' '}
        <span className={highlight}>Software Developer</span> located in Shanghai, China.
      </p>
      <p>
        I am working on a variety of technologies including Web Development and Backend Development.
      </p>
      <Separator />
      <p className="text-xl">Technologies and Tools</p>
      <div className="flex flex-row flex-wrap">
        {skills.map((skill, idx) => {
          return <img key={idx} className="p-1" src={skill.img} alt={skill.label} />;
        })}
      </div>
      <Separator />
      <p>
        Find me on{' '}
        <Link textDecoration="underline" href="https://github.com/lwshen" isExternal>
          <span className={blackTextColor}>Github</span> <ExternalLinkIcon mx="2px" />
        </Link>
      </p>
    </Box>
  );
}
