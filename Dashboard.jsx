import { HelloWidget } from "components/atoms/HelloWidget/HelloWidget";
import { MainLayout } from "components/layouts/MainLayout/MainLayout";
import { ReservationsSection } from "components/molecules/ReservationsSection/ReservationsSection";
import React from "react";
import { useState, useEffect } from "react";
import { StoriesSection } from "components/organisms/StoriesSection/StoriesSection";
import { RestaurantCard } from "components/atoms/RestaurantCard/RestaurantCard";
import { ViewEatOutCard } from "components/molecules/ViewEatOutCard/ViewEatOutCard";

export const Dashboard = (data) => {
  const userData = data.data?.userData[0];
  const firstName = userData?.userName.split(" ")[0];
  const reservationData = userData?.reservations;
  const [storiesData, setStoriesData] = useState();
  const [restaurantData, setRestaurantData] = useState();
  const restaurantCardData = restaurantData?.restaurants[0];
  const ratingArray = restaurantCardData?.reviews.map(
    (review) => review.rating
  );

  useEffect(() => {
    fetch(
      "http://frontendsourceryweb.s3-website.eu-central-1.amazonaws.com/restaurants.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setRestaurantData(result);
        },

        (error) => {
          // handle error here
        }
      );
    fetch(
      "http://frontendsourceryweb.s3-website.eu-central-1.amazonaws.com/stories.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setStoriesData(result);
        },

        (error) => {
          // handle error here
        }
      );
  }, []);

  return (
    <MainLayout>
      <HelloWidget name={firstName} />
      <ReservationsSection reservationData={reservationData} />
      <RestaurantCard
        displayFullCard
        numberOfCheckIns={restaurantCardData?.checkIns}
        restaurantName={restaurantCardData?.name}
        restaurantWebsite={restaurantCardData?.website.replace(
          /(^\w+:|^)\/\//,
          ""
        )}
        restaurantAddress={restaurantCardData?.location.address}
        restaurantOpeningHours={restaurantCardData?.openingHours[0].hours}
        restaurantDescription={restaurantCardData?.description}
        restaurantCategories={restaurantCardData?.categories}
        restaurantImage={restaurantCardData?.image}
        restaurantAverageRating={ratingArray}
      />
      <ViewEatOutCard />
      {storiesData && <StoriesSection data={storiesData} />}
    </MainLayout>
  );
};
