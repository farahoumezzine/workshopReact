import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';

// Lazy loading des composants
const Events = React.lazy(() => import('./Components/Events'));
const EventDetails = React.lazy(() => import('./Components/EventDetails'));
const NotFound = React.lazy(() => import('./Components/NotFound'));
const AddEvent = React.lazy(() => import('./Components/AddEvent'));
const UpdateEvent = React.lazy(() => import('./Components/UpdateEvent'));

function App() {
  return (
    <>
      <NavigationBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:name" element={<EventDetails />} />
          <Route path="/events/add" element={<AddEvent />} />
          <Route path="/events/update/:id" element={<UpdateEvent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
