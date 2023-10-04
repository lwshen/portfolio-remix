import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Card,
  CardBody,
  Heading,
  Img,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

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
      <SimpleGrid columns={2} spacing={10}>
        {projects.map((project, idx) => {
          return (
            <Card key={idx} maxW="sm">
              <CardBody>
                <AspectRatio maxW="sm" ratio={16 / 9}>
                  <Img loading="eager" borderRadius="lg" src={project.previewImg} alt="Portfolio" />
                </AspectRatio>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{project.title}</Heading>
                  <Text>{project.content}</Text>
                  {project.githubUrl && (
                    <Link href={project.githubUrl} isExternal>
                      Github <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                  {project.demoUrl && (
                    <Link href={project.demoUrl} isExternal>
                      Demo <ExternalLinkIcon mx="2px" />
                    </Link>
                  )}
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
