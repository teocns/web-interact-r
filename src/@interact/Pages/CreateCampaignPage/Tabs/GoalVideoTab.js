import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Modal,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CreateCampaignItemWrapper from "../CreateCampaignItemWrapper";
import TitleAndDesc from "../CampaignTitleAndDesc";
import { Add, Close } from "@mui/icons-material";
import {
  getYoutubeIDFromURL,
  isValidHttpUrl,
} from "@interact/Components/utils";
import { TabNavigation } from "../TabNavigation";
import { useFormValidation } from "@interact/Hooks/use-form-validation";
import { addTrailingZerosToDollarValue } from "@interact/Components/utils";

export default function GoalVideoTab({
  data,
  setData,
  selectedTabIndex,
  setSelectedTabIndex,
}) {
  const [isScriptExampleModalOpen, setIsScriptExampleModalOpen] =
    useState(false);
  const [campaignMoneyGoal, setCampaignMoneyGoal] = useState(
    addTrailingZerosToDollarValue(data?.goalValue)
  );
  const [campaignGoal, setCampaignGoal] = useState(data?.goal);
  const [selectedVideo, setSelectedVideo] = useState(data?.campaignVideoLink);
  const [videoThumbnailLink, setVideoThumbnailLink] = useState(
    data?.campaignVideoThumbnailLink
  );

  useEffect(() => {
    function getVideoThumbnailLink() {
      const id = getYoutubeIDFromURL(selectedVideo);
      const link = `http://i3.ytimg.com/vi/${id}/hqdefault.jpg`;
      setVideoThumbnailLink(link);
      setData({ campaignVideoThumbnailLink: link });
    }

    getVideoThumbnailLink();
  }, [selectedVideo]);

  const { goal, lastCompletedTabIndex } = data;

  const formValidationConditions =
    goal.length <= 50 && goal.length > 0 && isValidHttpUrl(selectedVideo);

  const isTabValidated = useFormValidation({
    selectedTabIndex,
    lastCompletedTabIndex,
    setData,
    formValidationConditions,
  });

  return (
    <>
      <Modal open={isScriptExampleModalOpen}>
        <Box
          sx={{
            p: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "background.paper",
            borderRadius: 3,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3" sx={{ mt: 1 }}>
              Sample campaign video script:
            </Typography>

            <IconButton onClick={() => setIsScriptExampleModalOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
          <Typography sx={{ mt: 2 }}>
            If you want to to meet & play with me, you have 2 options: enter the
            giveaway for free or with a VIP entry for $3, to have a chance of
            winning 50 interactions. At first, if only 50 people buy a ticket,
            the chance of winning would be 100%; but of course this will go down
            and you’ll see the live % chance of winning on the campaign page. If
            you unfortunately don’t win, your chance to win will be doubled in
            future campaigns, stacking up to 4x. If you’ve saved up some
            birthday money or just won a tournament prize because you're so
            good, bid in the auction where 50 interactions are being offered.
            Pretty much the top 50 bids are on the leaderboard, and at the end
            of the campaign on December 10th at 8pm, those on the leaderboard
            win an interaction while the losers not on the leaderboard are not
            charged. These interactions will occur first, and the top 3 will
            have double the time to chat & game with me.
          </Typography>
        </Box>
      </Modal>
      <Stack direction="column" alignItems="center">
        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          What's your goal for this campaign?
        </Typography>
        <Stack direction="row" alignItems="center" mt={4} sx={{ fontSize: 18 }}>
          If we raise{" "}
          <GoalInput
            value={campaignMoneyGoal}
            setValue={setCampaignMoneyGoal}
            setData={setData}
            dataField={"goalValue"}
          />
          I will
          <FormControl>
            <TextField
              sx={{ mx: 2, mt: 2, width: 400 }}
              variant="outlined"
              inputProps={{ maxLength: 50 }}
              error={goal.length <= 0}
              value={campaignGoal}
              onChange={(e) => {
                setData({ goal: e.target.value });
                setCampaignGoal(e.target.value);
              }}
              helperText="Max. 50 characters."
              placeholder={`Eat a cricket on stream`}
              fullWidth
            />
          </FormControl>
        </Stack>
      </Stack>

      <CreateCampaignItemWrapper>
        <TitleAndDesc title="Introduction Video">
          Include a link to a short YouTube video where you describe your
          campaign and goal where you tell your fans about the goal, explain how
          interactions work & how fans can acquire them in the campaign.
          <br />
          <br />
          We'll automatically get the thumbnail from your video link. This is
          what users will see when looking for your campaign.
          <br />
          <br />
          <Button
            sx={{
              textTransform: "none",
              textAlign: "left",
              p: 0,
              textDecoration: "underline",
            }}
            onClick={() => setIsScriptExampleModalOpen(true)}
          >
            Not sure what to say? See a sample script here
          </Button>
        </TitleAndDesc>
        <Stack spacing={3}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
            sx={{
              bgcolor: "divider",
              width: 280,
              height: 150,
              borderRadius: 2,
              overflow: "hidden",
              p: 2,
              textAlign: "center",
            }}
          >
            <img
              style={{
                width: "280px",
                height: "150px",
                objectFit: "cover",
              }}
              alt="video-thumbnail"
              src={videoThumbnailLink}
            />
          </Stack>

          <TextField
            variant="outlined"
            fullWidth
            error={!isValidHttpUrl(selectedVideo)}
            label="Video link"
            value={selectedVideo}
            onChange={(e) => {
              setSelectedVideo(e.target.value);
              setData({ campaignVideoLink: e.target.value });
            }}
          />
        </Stack>
      </CreateCampaignItemWrapper>
      <TabNavigation
        disableNext={!isTabValidated}
        selectedTabIndex={selectedTabIndex}
        setSelectedTabIndex={setSelectedTabIndex}
      />
    </>
  );
}

// Note - worth refactoring with BitInput from InteractionTab.js
function GoalInput({ value, setValue, setData, dataField }) {
  // These are currently the same for both auctions and giveaway. If they change,
  // pass these values in through props instead.
  const increment = 0.5;
  const minValue = 10;

  function validate(nextValue) {
    function isValidIncrement(nextIncrement) {
      if (nextIncrement % increment === 0) {
        return true;
      } else {
        return false;
      }
    }

    return (
      typeof nextValue === "number" &&
      !isNaN(nextValue) &&
      nextValue >= minValue &&
      isValidIncrement(nextValue)
    );
  }

  function handleBid(e) {
    const nextValue = Number(e.target.value);
    const isValid = validate(nextValue);
    if (!isValid) {
      setValue(addTrailingZerosToDollarValue(minValue));
    } else {
      setValue(addTrailingZerosToDollarValue(nextValue));
      setData({ [dataField]: nextValue });
    }
  }

  return (
    <FormControl>
      <OutlinedInput
        type="number"
        error={value < minValue}
        inputProps={{ step: ".50" }}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        sx={{ mx: 2, mt: 2 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => handleBid(e)}
      />
      <FormHelperText sx={{ ml: 3 }}>
        $0.50 increments. Min. $10.00
      </FormHelperText>
    </FormControl>
  );
}
