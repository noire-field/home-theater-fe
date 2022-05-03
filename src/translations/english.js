const Common = {
    "AppName": "Home Theater"
}

const Manage = {
    "Authentication": "Dashboard Authentication",
    "ListOfShows": "List of shows",
    "ListNoShow": "There is no show",
    "ShowBeingProcessed": "This show is being processed.",
    "ShowIsScheduled": "This show is scheduled, cancel it first if you want to delete.",
    "ShowBeingWatched": "This show is being watched.",
    "ShowAlreadyFinished": "This show is already finished.",
    "ShowAlreadyCancelled": "This show is already cancelled."
}

const Watch = {
    "RoomFound": {
        "JoiningRoom": "Joining Room",
        "WeFoundRoom": "We found a room that matches your code!",
        "WhyFriendlyName": "This will help friends in room to recognize you easily."
    },
    "Waiting": {
        "VolumeIssue1": "In order to protect user's privacy, the video will start with muted volume.",
        "VolumeIssue2": "After it starts, please manually adjust the volume as you like!"
    },
    "Watching": {
        "VoteToPause": "{{ name }} wants to pause the movie for a while, do you agree?",
        "VoteToResume": "{{ name }} wants to resume the movie, do you agree?"
    },
    "Finished": {
        "TheEnd": "The End",
        "HopeYouLikeIt": "The show has ended, we hope you like it!"
    },
    "SmartSync": {
        "Syncing": "SmartSync is syncing...",
        "Delay": "Delay",
        "Rate": "Rate"
    }
}

const Action = {
    "ManageRoom": "Manage Room",
    "FindRoom": "Find Room",
    "AddShow": "Add Show",
    "EditShow": "Edit Show",
    "Update": "Update",
    "Delete": "Delete",
    "Refresh": "Refresh",
    "JoinRoom": "Join Room",
    "PreviewMovie": "Preview Movie",
    "AddWaitTime": "More 5 Minutes Wait",
    "StartNow": "Start Now",
    "ReturnHomepage": "Return To Homepage",
    "VoteToPause": "Vote for pausing",
    "VoteToResume": "Vote for resuming",
    "Yes": "Yes",
    "No": "No"
}

const Field = {
    "PINCode": "PIN Code",
    "AdminPassword": "Admin's Password",
    "ID": "ID",
    "Title": "Title",
    "StartTime": "Start Time",
    "Duration": "Duration",
    "Status": "Status",
    "Action": "Action",
    "SubtitleUrl": "Subtitle Url",
    "MovieUrl": "Movie Url",
    "Addons": "Addons",
    "SmartSync": "Smart Sync",
    "VotingControl": "Voting Control",
    "MyFriendlyName": "My Friendly Name",
    "Viewers": "Viewers"
}

const Question = {
    "ReallyWantToDelete": "Are you sure you want to delete?"
}

const StatusText = {
    "Processing": "Processing",
    "Scheduled": "Scheduled",
    "Watching": "Watching",
    "Finished": "Finished",
    "Cancelled": "Cancelled",
    "Error": "Error"
}

const Error = {
    "SomethingWentWrong": "Something went wrong",
    "InvalidCredentials": "Invalid credentials",
    "InvalidTimeFormat": "Invalid time format (Example: 17:30 2022-02-16)",

    "Show": {
        "StartTimeTooEarly": "Start time is too early, it needs to be at least 5 minutes later than current time.",
        "PassCodeIsBeingUsed": "This pin code is being used by other show.",
        "UnableToParseSubtitle": "Unable to parse this subtitle url.",
        "UnableToVerifyVideoUrl": "Unable to verify this video url."
    },
    "Watch": {
        "RoomNotFound": "Unable to find room with this code.",
        "UnableToEnterFullScreen": "Unable to enter full-screen mode, permission denied."
    }
}

// Should not change this
const Language = {
    "English": "English",
    "Lithuanian": "Lietuvių",
    "Vietnamese": "Tiếng Việt"
}

export default {
    Common,
    Manage,
    Watch,
    Action,
    StatusText,
    Question,
    Field,
    Language,
    Error
}