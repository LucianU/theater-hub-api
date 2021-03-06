import { Award, Experience, Education,
                 User, UserImage, UserVideo }         from "../../models";
import { SocialMediaCategoryType,
                      VisibilityType, LocaleType }    from "../../enums";
import { PofileProjectDTO }                           from "../projects";

export class ProfileDTO {

    public constructor (user: User, includeID: boolean = false, includeProjects: boolean = false) {

        if (includeID) {
            this.ID = user.ID;
        }

        this.Email        = user.Email;
        this.Username     = user.Username;
        this.FirstName    = user.Professional.FirstName;
        this.LastName     = user.Professional.LastName;

        const profileImage = user.ProfileImage || user.PhotoGallery.find(p => p.IsProfileImage);

        if (profileImage) {
            this.ProfileImage = {
                ...profileImage
            };
        }

        this.BirthDate    = user.BirthDate;
        this.PhoneNumber  = user.PhoneNumber;
        this.Description  = user.Description;
        this.Website      = user.Website;

        if (user.Professional.Skills) {
            this.Skills = user.Professional.Skills.map(s => s.ID.toString());
        }

        this.PhotoGallery   = user.PhotoGallery.filter(p => !p.IsProfileImage).map(p => {

            return {
                ...p
            };
        });

        this.VideoGallery   = user.VideoGallery;
        this.Awards         = user.Awards.sort((a1, a2) => a1.Date.getTime() > a2.Date.getTime() ? -1 : 1);
        this.Experience     = user.Professional.Experience.sort((e1, e2) => e1.StartDate.getTime() > e2.StartDate.getTime() ? -1 : 1);
        this.Education      = user.Professional.Education.sort((e1, e2) => e1.StartDate.getTime() > e2.StartDate.getTime() ? -1 : 1);

        for (const item of user.SocialMedia) {
            switch (item.SocialMediaCategoryID) {
                case  SocialMediaCategoryType.Instagram:
                    this.InstagramLink = item.Link;
                    break;
                case SocialMediaCategoryType.Youtube:
                    this.YoutubeLink = item.Link;
                    break;
                case SocialMediaCategoryType.Facebook:
                    this.FacebookLink = item.Link;
                    break;
                case SocialMediaCategoryType.Linkedin:
                    this.LinkedinLink = item.Link;
                    break;
            }
        }

        this.ProfileVisibility     = user.AccountSettings.ProfileVisibility;
        this.EmailVisibility       = user.AccountSettings.EmailVisibility;
        this.BirthDateVisibility   = user.AccountSettings.BirthDateVisibility;
        this.PhoneNumberVisibility = user.AccountSettings.PhoneNumberVisibility;

        this.Locale                = user.AccountSettings.Locale;

        if (includeProjects && user.Projects) {
            this.Projects = user.Projects.map(p => new PofileProjectDTO(p));
        }
    }

    public ID?: string;

    public Email?: string;

    public Username?: string;

    public FirstName?: string;

    public LastName?: string;

    public RegistrationID?: string;

    // General Information

    public ProfileImage?: UserImage;

    public BirthDate?: Date;

    public PhoneNumber?: string;

    public Description?: string;

    public Website?: string;


    // Skills

    public Skills?: string[];


    // Portfolio

    public PhotoGallery?: UserImage[];

    public VideoGallery?: UserVideo[];


    // Awards

    Awards?: Award[];


    // Experience

    Experience?: Experience[];


    // Education

    Education?: Education[];


    // Social media

    public InstagramLink?: string;

    public YoutubeLink?: string;

    public FacebookLink?: string;

    public LinkedinLink?: string;

    // Privacy

    public ProfileVisibility?: VisibilityType;

    public EmailVisibility?: VisibilityType;

    public BirthDateVisibility?: VisibilityType;

    public PhoneNumberVisibility?: VisibilityType;

    // Locale

    public Locale: LocaleType;

    // Projects

    public Projects?: PofileProjectDTO[];
}
