export interface Author {
  slug: string;
  name: string;
  bio: string;
  avatar?: string;
  role: string;
  company: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const authors: Record<string, Author> = {
  sebastienlevert: {
    slug: 'sebastienlevert',
    name: 'Sébastien Levert',
    bio: 'Principal Product Manager on the Microsoft 365 Copilot Extensibility team, helping full-stack developers build declarative agents. With nearly two decades in the Microsoft ecosystem, Sébastien focuses on developer experience for Copilot for Microsoft 365, TypeSpec, and Kiota. He shares insights, stories, and ideas around the Microsoft 365 development platform.',
    role: 'Principal Product Manager',
    company: 'Microsoft',
    social: {
      github: 'https://github.com/sebastienlevert',
      twitter: 'https://twitter.com/sebastienlevert',
      linkedin: 'https://www.linkedin.com/in/sebastienlevert/',
      website: 'https://www.sebastienlevert.com/',
    },
  },
};

export function getAuthor(slug: string): Author | undefined {
  return authors[slug];
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
