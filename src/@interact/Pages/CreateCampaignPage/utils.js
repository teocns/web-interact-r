const { db } = require("@jumbo/services/auth/firebase/firebase");
const { addDoc, collection } = require("firebase/firestore");

// this is where we set the init values for the campaign creation
export async function initCampaignDoc() {
  var docRef = {};
  try {
    docRef = await addDoc(collection(db, "campaigns"), {
      FAQAnswers: { 0: "123", 1: "244edfe" },
      auctionMinBid: 1.5,
      campaignGoalTotal: 20,
      campaignStatus: "scheduled",
      campaignVideoLink: "https://www.youtube.com/watch?v=n0UXA7oLc-s",
      campaignVideoThumbnailLink:
        "http://i3.ytimg.com/vi/n0UXA7oLc-s/hqdefault.jpg",
      categories: ["Humor", "Films, shows & anime", "Sports"],
      creatorName: "creator",
      creatorWeeklyAvailability: 8,
      currency: "USD",
      currencyExchangeRate: 1,
      currentRaisedGoalValue: 2,
      customSavedURL: null,
      customURL: "custom-campaign",
      description:
        "This is a campaign description of a campaign where you describe your campaign and how it campaigns",
      durationDays: 8,
      endDateTime: { seconds: 1668623400, nanoseconds: 0 },
      giveawayVIPEntryCost: 3.5,
      goal: "upgrade to an ultimate PC setup ",
      goalValue: 10000,
      header: { title: "Game" },
      interactMethod: "googleMeet",
      interactionDurationTime: 60,
      interactionEndDateTime: { seconds: 1673809200, nanoseconds: 0 },
      interactionStartDateTime: { seconds: 1668970800, nanoseconds: 0 },
      interactionTopDurationTime: 120,
      interactionWindow: 8,
      lastCompletedTabIndex: -1,
      numAuctionInteractions: 28,
      numGiveawayInteractions: 13,
      person: { id: "PNUa4JcusGMYowApbfPLflxAtap2", username: "umerhayat" },
      savedCustomURL: "campaign-1",
      shouldReserveURL: false,
      socials: {
        discord: "https://www.youtube.com/c/mkbhd",
        facebook: "https://www.youtube.com/c/mkbhd",
        instagram: "https://www.youtube.com/c/mkbhd",
        reddit: "https://www.youtube.com/reddit",
        tiktok: "https://www.youtube.com/c/tiktok",
        twitch: "https://twitch.com/",
        twitter: "https://www.youtube.com/c/mkbhd",
        youtube: "https://www.youtube.com/yt",
      },
      startDateTime: { seconds: 1667932200, nanoseconds: 0 },
      title: "I will eat 100 hotdogs at $3000.00",
      youtube: "linkdjfnskdjfnkjdsnf",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return docRef.id;
}