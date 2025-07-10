import UpdateProfile from "@/app/admin/user/update/[username]/UpdateProfile";

export type UserData = {
    name: string,
    email: string,
    phone: string,
    headline: string,
    intro: string,
    facebook: string,
    insta: string,
    linkedin: string,
    twitter: string,
    yt: string,
}

export type Education = {
    institute: string,
    degree: string,
    passingYear: string
    description: string;
}

export type WorkExperience = {
    company: string;
    position: string;
    workingPeriod: string;
    description: string;
}

export type Skill = {
    nid: string;
    name: string;
}

export type Projects = {
    name: string,
    link: string,
    image: File | null,
    description: string
}

export type SocialActivity = {
    title: string,
    description: string
}

export type FormData = {
    personalData: UserData,
    education: Education[],
    workExp: WorkExperience[],
    skills: Skill[],
    tools: Skill[],
    projects: Projects[],
    achievements: Projects[],
    socialActivity: SocialActivity[],
}

export type AddProfileProps = {
    selectedForm: number;
    setSelectedForm: React.Dispatch<React.SetStateAction<number>>;
    candidateData: FormData;
    setCandidateData: React.Dispatch<React.SetStateAction<FormData>>;
};

export interface CandidateRow {
    id: number;
    name: string;
    email: string;
    profileId: string
}

export type HeroProps = {
    userData: any;
    loading: boolean
    userName?: string
};

export type UpdateUserData = {
    profile_nid: string;
    name: string,
    email: string,
    phone: string,
    headline: string,
    intro: string,
    facebook: string,
    insta: string,
    linkedin: string,
    twitter: string,
    yt: string,
    profile: string | File;
}

export type UpdateEducation = {
    education_nid: string,
    institute: string,
    degree: string,
    passingYear: string
    description: string;
}

export type UpdateWorkExperience = {
    work_exp_nid: string,
    company: string;
    position: string;
    workingPeriod: string;
    description: string;
}

export type UpdateSkill = {
    expert_area_nid: string;
    skill_name: string,
    skill_desc: string,
    skill_icon: string | File
}

export type UpdateTools = {
    tools_nid: string;
    title: string;
    tools_image: string | File;
}

export type UpdateProjects = {
    recent_project_nid: string
    name: string,
    link: string,
    image: File | null,
    description: string
}

export type UpdateAchievement = {
    achievement_nid: string
    name: string,
    link: string,
    image: File | null,
    description: string
}

export type UpdateSocialActivity = {
    social_activities_nid: string;
    title: string,
    description: string
}

export type UpdateFormData = {
    personalData: UpdateUserData,
    education: UpdateEducation[],
    workExp: UpdateWorkExperience[],
    skills: UpdateSkill[],
    tools: UpdateTools[],
    projects: UpdateProjects[],
    achievements: UpdateAchievement[],
    socialActivity: UpdateSocialActivity[],
}

export type ApiEducation = {
    education_nid: string;
    from_institute: string;
    degree_title: string;
    passing_year: string;
    education_profile: string;
};

export type ApiWorkExp = {
    work_exp_nid: string;
    company_name: string;
    last_designation: string;
    working_years: string;
    brief_job_profile: string;
};

export type ApiSkill = {
    expert_area_nid: string;
    expertise_name: string;
    expertise_name_details: string;
    expertise_icon: string;
};

export type ApiTool = {
    tools_nid: string;
    title: string;
    tools_image: string;
};

export type ApiProject = {
    recent_project_nid: string;
    title: string;
    project_link: string;
    recent_project_img: string | null;
    recent_project_icon_img?: string | null;
    project_description: string;
};

export type ApiAchievement = {
    achievement_nid: string;
    title: string;
    achievement_url: string;
    achievement_image: string | null;
    achievement_description: string;
};

export type ApiSocialActivity = {
    social_activities_nid: string;
    title: string;
    description: string;
};

export type CandidateNewData = {
    personalData: UpdateUserData;
    education: ApiEducation[];
    workExp: ApiWorkExp[];
    skills: ApiSkill[];
    tools: ApiTool[];
    projects: ApiProject[];
    achievements: ApiAchievement[];
    socialActivity: ApiSocialActivity[];
};


export type NewUserData = {
    profile_nid?: string;
    name?: string;
    profile_heading?: string;
    facebook_link?: string;
    instagram_link?: string;
    linkedin_link?: string;
    twitter_link?: string;
    youtube_link?: string;
    introduction?: string;
    profile_youtube_link?: string;
    phone_number?: string;
    profile_email?: string;
    profile_city?: string;
    main_address?: string;
    profile_slug?: string;
    profile_photo?: string;
    education_list?: ApiEducation[];
    work_exp_list?: ApiWorkExp[];
    expert_area_list?: ApiSkill[];
    recent_project_list?: ApiProject[];
    achievement_list?: ApiAchievement[];
    tools_list?: ApiTool[];
    social_activities_list?: ApiSocialActivity[];
};

export interface UserProfileData {
    achievement_list: boolean;
    education_list: boolean;
    expert_area_list: boolean;
    facebook_link: string;
    instagram_link: string;
    introduction: string;
    linkedin_link: string;
    main_address: string;
    name: string;
    phone_number: string;
    profile_city: string;
    profile_email: string;
    profile_heading: string;
    profile_nid: string;
    profile_photo: string;
    profile_slug: string;
    profile_url: string;
    profile_youtube_link: string;
    recent_project_list: boolean;
    social_activities_list: boolean;
    tools_list: boolean;
    twitter_link: string;
    work_exp_list: boolean;
    youtube_link: string;
}
