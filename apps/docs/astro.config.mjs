import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'North Star Build',
      description: 'Governed autonomy for AI-native development.',
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', link: '/' },
            { label: 'CLI', link: '/cli' },
            { label: 'Configuration', link: '/configuration' },
            { label: 'Anchors', link: '/anchors' },
            { label: 'SSAP', link: '/ssap' }
          ]
        }
      ]
    })
  ]
});
