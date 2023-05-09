
import getCurrentUser from "@/app/actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import ClientOnly from "../components/common/ClientOnly";
import { EmptyState } from "../components/common/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListings";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
