export type MobileMenuItem = {
  title: string
  url: string
}

export type MobileMenu = {
  items: MobileMenuItem[]
}

export type ThemeImagePaths<T> = {
  logos: Record<string, T>
  icons: Record<string, T>
  defaults: Record<string, T>
  // Also any string: string pair
  bgFooter: T
  headerBorder: T
  backgroundHero: T
}

export type SiteManifest = {
  name: string
  short_name: string
  start_url: string
}
