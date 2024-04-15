export enum ENonProtectedRoutes {
  HOME = '/',
  RECIPES = '/recipes',
  RECIPE_DETAILS = '/recipes/:id',
  SIGNIN = '/signin',
  RESET_PASSWORD = '/reset-password',
  NEW_PASSWORD = '/new-password/:token/*',
  ARTICLES = '/articles',
  CONTACT_US = '/contact-us',
  USERS = '/users',
  BLOGS = '/blogs',
  BLOG_DETAILS = '/blogs/:id',
  TIPS_AND_TRICKS = '/tips-and-tricks',
  PRIVACY_POLICY = '/privacy-policy',
  COOKIE_POLICY = '/cookie-policy',
}

export enum EProtectedRoutes {
  ADMIN = '/admin',
  ADMIN_UNITS = '/admin/units',
  ADMIN_USERS = '/admin/users',
  ADMIN_CATEGORIES = '/admin/categories',
  ADMIN_LABELS = '/admin/labels',
  ME = '/me',
  PROFILE = '/me/profile',
  MY_RECIPES = '/me/recipes',
  FAVORITES = '/me/favorites',
  NEW_RECIPE = '/new-recipe',
}
