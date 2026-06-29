import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'

// Lazy loaded page components
const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Services = lazy(() => import('../pages/Services'))
const Portfolio = lazy(() => import('../pages/Portfolio'))
const Careers = lazy(() => import('../pages/Careers'))
const Internship = lazy(() => import('../pages/Internship'))
const Training = lazy(() => import('../pages/Training'))
const Blog = lazy(() => import('../pages/Blog'))
const Contact = lazy(() => import('../pages/Contact'))
const Technologies = lazy(() => import('../pages/Technologies'))
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: 'portfolio',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: 'careers',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Careers />
          </Suspense>
        ),
      },
      {
        path: 'internship',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Internship />
          </Suspense>
        ),
      },
      {
        path: 'training',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Training />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: 'technologies',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Technologies />
          </Suspense>
        ),
      },
      {
        path: 'services/:serviceId',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ServiceDetail />
          </Suspense>
        ),
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
