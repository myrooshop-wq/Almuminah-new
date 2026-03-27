import React from 'react';

/**
 * PageMeta — sets document title + meta description per page
 * without any external library (react-helmet not needed).
 * Call at the top of each page component.
 */
interface PageMetaProps {
  title: string;
  description?: string;
}

export const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => {
  React.useEffect(() => {
    // Set title
    document.title = title;

    // Set meta description
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }

    // Restore base title when component unmounts (navigation away)
    return () => {
      document.title = "Al-Mu'minah School Surat | Islamic Girls School | SSC Board";
    };
  }, [title, description]);

  return null;
};
