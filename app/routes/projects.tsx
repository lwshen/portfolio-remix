import { AspectRatio, Card, Heading, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { LuExternalLink } from 'react-icons/lu';

import DotfilesImage from '~/assets/image/project/dotfiles.png';
import PortfolioImage from '~/assets/image/project/portfolio.png';
import Title from '~/components/Title';

export default function Projects() {
  const projects = [
    {
      title: 'Portfolio',
      content: 'My portfolio website, built with Remix, TypeScript, Tailwind, Chakra UI.',
      previewImg: PortfolioImage,
      githubUrl: 'https://github.com/lwshen/portfolio-remix',
      demoUrl: 'https://portfolio.ryos.dev',
    },
    {
      title: 'dotfiles',
      content: '💻 macOS / Ubuntu dotfiles',
      previewImg: DotfilesImage,
      githubUrl: 'https://github.com/lwshen/dotfiles',
    },
  ];

  return (
    <div>
      <Title>Projects</Title>
      <SimpleGrid columns={2} gap={10}>
        {projects.map((project, idx) => {
          return (
            <Card.Root key={idx} maxW="sm">
              <Card.Body>
                <AspectRatio maxW="sm" ratio={16 / 9}>
                  <Image
                    loading="eager"
                    borderRadius="lg"
                    src={project.previewImg}
                    alt="Portfolio"
                  />
                </AspectRatio>
                <Stack mt="6" gap="3">
                  <Heading size="md">{project.title}</Heading>
                  <Text>{project.content}</Text>
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      Github <LuExternalLink />
                    </Link>
                  )}
                  {project.demoUrl && (
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      Demo <LuExternalLink />
                    </Link>
                  )}
                </Stack>
              </Card.Body>
            </Card.Root>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
