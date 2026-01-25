import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCallout extends Struct.ComponentSchema {
  collectionName: 'components_content_callouts';
  info: {
    description: 'Highlighted content block for quotes, info, or key points';
    displayName: 'Callout';
    icon: 'quote';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['info', 'highlight', 'quote']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'info'>;
  };
}

export interface ContentCapability extends Struct.ComponentSchema {
  collectionName: 'components_content_capabilities';
  info: {
    description: 'Service capability with title and description';
    displayName: 'Capability';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentCredibilityItem extends Struct.ComponentSchema {
  collectionName: 'components_content_credibility_items';
  info: {
    description: 'Featured in logo or credibility badge';
    displayName: 'Credibility Item';
    icon: 'star';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface ContentEducationItem extends Struct.ComponentSchema {
  collectionName: 'components_content_education_items';
  info: {
    description: 'Academic degree and institution';
    displayName: 'Education Item';
    icon: 'graduation-cap';
  };
  attributes: {
    degree: Schema.Attribute.String & Schema.Attribute.Required;
    institution: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.Integer;
  };
}

export interface ContentExternalLink extends Struct.ComponentSchema {
  collectionName: 'components_content_external_links';
  info: {
    description: 'Link to external resource';
    displayName: 'External Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentKeyFinding extends Struct.ComponentSchema {
  collectionName: 'components_content_key_findings';
  info: {
    description: 'Single key finding or bullet point';
    displayName: 'Key Finding';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ContentOfficeLocation extends Struct.ComponentSchema {
  collectionName: 'components_content_office_locations';
  info: {
    description: 'Office address and contact information';
    displayName: 'Office Location';
    icon: 'pinMap';
  };
  attributes: {
    address: Schema.Attribute.Text;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
  };
}

export interface ContentProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_content_process_steps';
  info: {
    description: 'Step in a service process';
    displayName: 'Process Step';
    icon: 'arrowRight';
  };
  attributes: {
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    stepDescription: Schema.Attribute.Text;
    stepTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentStatBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_stat_blocks';
  info: {
    description: 'Single statistic with label and value';
    displayName: 'Stat Block';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CtaButton extends Struct.ComponentSchema {
  collectionName: 'components_cta_buttons';
  info: {
    description: 'Call-to-action button';
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'ghost']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    description: 'Hero section with headline, subheadline, and CTA';
    displayName: 'Hero';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.Component<'cta.button', false>;
    secondaryCta: Schema.Attribute.Component<'cta.button', false>;
    subheadline: Schema.Attribute.Text;
    variant: Schema.Attribute.Enumeration<['dark', 'light']> &
      Schema.Attribute.DefaultTo<'dark'>;
  };
}

export interface LayoutNavItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_items';
  info: {
    description: 'Navigation menu item';
    displayName: 'Nav Item';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_section_headers';
  info: {
    description: 'Heading and subheading for page sections';
    displayName: 'Section Header';
    icon: 'layout';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'cta.button', false>;
    subheading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.callout': ContentCallout;
      'content.capability': ContentCapability;
      'content.credibility-item': ContentCredibilityItem;
      'content.education-item': ContentEducationItem;
      'content.external-link': ContentExternalLink;
      'content.key-finding': ContentKeyFinding;
      'content.office-location': ContentOfficeLocation;
      'content.process-step': ContentProcessStep;
      'content.stat-block': ContentStatBlock;
      'cta.button': CtaButton;
      'layout.hero': LayoutHero;
      'layout.nav-item': LayoutNavItem;
      'layout.section-header': LayoutSectionHeader;
    }
  }
}
