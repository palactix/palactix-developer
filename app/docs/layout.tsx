import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import themeConfig from '../../theme.config'
import 'nextra-theme-docs/style.css'

export default async function DocsLayout({ children }: Readonly<{
  children: React.ReactNode;
}> ) {
  const pageMap = await getPageMap("/docs")
  

  const navbar = (
    <Navbar
      logo={
        <div>
          <b>Palactix</b>{' '}
          <span style={{ opacity: '60%' }}>Docs</span>
        </div>
      }
      // Next.js discord server
      // chatLink="https://discord.gg/hEM84NMkRv"
    />
  )

  return (
    <Layout
      {...themeConfig}
      banner={<Banner storageKey="Palactix">Palactix Beta</Banner>}
      navbar={navbar}
      footer={<Footer>MIT {new Date().getFullYear()} © Palactix.</Footer>}
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      pageMap={pageMap}
      
    >
      <div className="plx-docs-content">
        {children}
      </div>
    </Layout>
  )
}