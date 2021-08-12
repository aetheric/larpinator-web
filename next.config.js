module.exports = {
  reactStrictMode: false,
  images: {
    disableStaticImages: false
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  },
}