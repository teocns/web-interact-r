import { TextField, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopBar from "../../Components/TopBar/TopBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import ReactModal from "react-modal";

import "./UserProfilePage.css";
import Scheduler from "../../Components/Scheduler/Scheduler";
import CampaignSnippet from "../../Components/CampaignSnippet/CampaignSnippet";
import FollowedCampaigns from "./FollowedCampaigns";
import CreatorSchedules from "./CreatorSchedule";
import MeetingBlocks from "./MeetingBlocks";
import FollowerListItem from "./FollowerList";
import FollowerList from "./FollowerList";

import { auth, db, logout } from "@jumbo/services/auth/firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate,useParams } from "react-router-dom";
import InteractButton from "@interact/Components/Button/InteractButton";
import { FollowButton } from "../CampaignPage/Stats";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserProfilePage() {
  const [tab, setTab] = React.useState(0);
  let { id } = useParams();
  
  let user_id = id;
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const isCreator = auth.currentUser.uid == user_id?true:false;

  const [modalOpened, setModalOpened] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      //console.log('user_id');
      //console.log(user_id);
      let q = query(collection(db, "users"), where("uid", "==", user?.uid));
      if(user_id){
         q = query(collection(db, "users"), where("uid", "==", user_id));  
      }
      const doc = await getDocs(q);
      //console.log('doc');
      //console.log(doc);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    let user_id = id;

    //console.log('username');
    //console.log(user_id);
    
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading,id]);

  localStorage.setItem('name',name);

  return (
    <div>
      <FollowerList open={modalOpened} setOpen={setModalOpened} />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          py: 4,
          borderRadius: 2,
        }}
      >
        <img
          className="profilePic"
          alt="profile-pic"
          src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg"
        />
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            paddingTop: 10,
          }}
        >
          {name}
        </div>
        <div style={{ marginTop: 10, color: "white", marginBottom: 10 }}>
          I love playing Smite and Minecraft
        </div>
        <div
          style={{
            display: "flex",
            boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            marginTop: 10,
            padding: 10,
            marginBottom: 5,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: "0 11px 0 11px",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          {/* <MeetingBlocks /> */}
          <div
            onClick={() => setModalOpened(true)}
            style={{
              fontSize: 20,
              color: "#782fee",
              marginRight: 20,
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            23k followers
          </div>
          <FollowButton />
        </div>
      </Stack>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="secondary"
            centered
          >
            <Tab
              label="Campaigns"
              {...a11yProps(0)}
              style={{ color: "black" }}
            />
            {isCreator &&
            <Tab
              label="Schedule"
              {...a11yProps(1)}
              style={{ color: "black" }}
            />
}
            {isCreator ? (
              <Tab
                label="Creator Schedule"
                {...a11yProps(1)}
                style={{ color: "black" }}
              />
            ) : null}
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <FollowedCampaigns />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Scheduler />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          {isCreator ? <CreatorSchedules /> : null}
        </TabPanel>
      </Box>
    </div>
  );
}

export default UserProfilePage;
