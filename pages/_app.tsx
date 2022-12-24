import React from 'react'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <SessionProvider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </SessionProvider>
        </Provider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
