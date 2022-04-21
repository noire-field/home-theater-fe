const Common = {
    "AppName": "Home Theater"
}

const Manage = {
    "Authentication": "Dashboard Authentication",
    "ListOfShows": "List of shows",
    "ListNoShow": "There is no show",
    "ShowAlreadyFinished": "This show is already finished"
}

const Action = {
    "ManageRoom": "Manage Room",
    "FindRoom": "Find Room",
    "AddShow": "Add Show",
    "EditShow": "Edit Show",
    "Update": "Update",
    "Delete": "Delete"
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
    "VotingControl": "Voting Control"
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
    Action,
    StatusText,
    Field,
    Language,
    Error
}