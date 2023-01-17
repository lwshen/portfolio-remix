import {
  AspectRatio,
  Card,
  CardBody,
  Heading,
  Img,
  Link,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import PortfolioImage from '~/assets/image/project/portfolio.png';

export default function Project() {
  const projects = [
    {
      title: 'Portfolio',
      content: 'My portfolio website, built with Remix, TypeScript, Tailwind, Chakra UI.',
      previewImg: PortfolioImage,
      githubUrl: 'https://github.com/lwshen/portfolio-remix',
      demoUrl: 'https://portfolio.ryos.dev'
    }
  ];

  return (
    <div>
      <p className="text-3xl font-bold pb-8 jin-bu-ti">Projects</p>
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
                  <Link href={project.githubUrl} isExternal>
                    Github <ExternalLinkIcon mx="2px" />
                  </Link>
                  <Link href={project.demoUrl} isExternal>
                    Demo <ExternalLinkIcon mx="2px" />
                  </Link>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
