import Container from '@/components/layout/container';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useThemeSync } from '@/hooks/use-theme-sync';
import ChatInterfacePage from '@/pages/chat-interface';

function App() {
  useThemeSync();

  return (
    <Container>
      <Header />
      <Content>
        <ChatInterfacePage />
      </Content>
      <Footer />
    </Container>
  );
}

export default App;
