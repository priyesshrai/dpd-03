type UserData = {
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

type Education = {
    institute: string,
    degree: string,
    passingYear: string
    description: string;
}

type WorkExperience = {
    company: string;
    position: string;
    workingPeriod: string;
    description: string;
}

type Skill = {
    nid: string;
    name: string;
}

type Projects = {
    name: string,
    link: string,
    image: File | null,
    description: string
}

type SocialActivity = {
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
  profileId:string
}


export type HeroProps = {
    userData: any;
    loading:boolean
};
