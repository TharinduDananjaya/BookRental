
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './router';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-amber-50">
            <Header />
            <main className="flex-grow">
              <AppRouter />
            </main>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  );
}

export default App;
