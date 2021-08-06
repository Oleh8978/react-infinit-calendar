import React from 'react';
import Link from '@app/routing/Link';

export interface IProps {
  className?: string;
}

const icon: React.FC<IProps> = ({ className }) => {
  return (
    <Link to="discovery">
      <svg
        className={className}
        width="180"
        height="79"
        viewBox="0 0 180 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.82192 61.3202C5.87286 61.1731 6.00529 61.047 6.21922 60.942C6.43315 60.8264 6.64708 60.7687 6.861 60.7687C7.16662 60.7687 7.31942 60.879 7.31942 61.0996C7.31942 61.1311 7.30924 61.1889 7.28886 61.2729C6.85082 62.8066 6.46371 63.9779 6.12753 64.7868C6.06641 64.9444 5.92379 65.0809 5.69968 65.1965C5.48575 65.3016 5.27182 65.3541 5.05789 65.3541C4.80321 65.3541 4.6555 65.2648 4.61475 65.0862C4.43138 64.2458 4.14615 63.8256 3.75904 63.8256C3.57567 63.8256 3.37193 63.9254 3.14781 64.125C2.65883 64.5872 2.27172 65.2123 1.98648 66.0001C1.71143 66.788 1.57391 67.5391 1.57391 68.2534C1.57391 68.7787 1.6605 69.2514 1.83368 69.6716C2.00686 70.0813 2.29719 70.3387 2.70467 70.4437C2.76579 70.4647 2.86257 70.4752 2.995 70.4752C3.33118 70.4752 3.66226 70.3492 3.98825 70.0971C4.32442 69.8344 4.59947 69.5666 4.8134 69.2934C5.02733 69.0098 5.30238 68.6264 5.63855 68.1431C5.72005 68.0276 5.84739 67.9383 6.02057 67.8753C6.19375 67.8017 6.36693 67.765 6.54011 67.765C6.7031 67.765 6.83044 67.7965 6.92213 67.8595C7.024 67.912 7.07493 67.9961 7.07493 68.1116C7.07493 68.2167 7.03928 68.327 6.96797 68.4425C6.42805 69.3145 5.77099 70.0708 4.99677 70.7116C4.22255 71.3419 3.40758 71.6571 2.55187 71.6571C2.37869 71.6571 2.2055 71.6413 2.03232 71.6098C1.34979 71.4942 0.840435 71.1528 0.504261 70.5856C0.168087 70.0078 0 69.3407 0 68.5844C0 68.3112 0.0254677 68.0171 0.0764032 67.7019C0.239397 66.6935 0.565383 65.7533 1.05436 64.8814C1.54334 63.9989 2.18513 63.3529 2.97972 62.9432C3.37702 62.7436 3.77432 62.6438 4.17161 62.6438C4.54854 62.6438 4.8949 62.7488 5.2107 62.9589L5.82192 61.3202Z"
          fill="#8179DC"
        />
        <path
          d="M9.40654 69.2462C9.38617 69.3722 9.37598 69.4615 9.37598 69.514C9.37598 69.9342 9.57463 70.1443 9.97192 70.1443C10.2062 70.1443 10.4915 70.0761 10.8276 69.9395C11.1333 69.8134 11.6986 69.5456 12.5238 69.1359C12.5442 68.8732 12.5645 68.6211 12.5849 68.3795C12.6155 68.1274 12.6409 67.9015 12.6613 67.7019L12.7683 66.6147C12.0654 66.9613 11.5407 67.2345 11.1944 67.4341C10.685 67.7387 10.2775 68.0276 9.97192 68.3007C9.66631 68.5633 9.47785 68.8785 9.40654 69.2462ZM13.3795 61.8244C13.8379 61.8244 14.1435 61.9452 14.2963 62.1868C14.4593 62.4179 14.5408 62.7593 14.5408 63.2111L14.5256 63.6523C14.4848 64.4191 14.3931 65.5432 14.2505 67.0244C14.2199 67.2345 14.1843 67.5864 14.1435 68.0801C14.1028 68.3848 14.0671 68.6316 14.0366 68.8207C14.1486 68.8837 14.2047 68.9678 14.2047 69.0728C14.2047 69.1464 14.169 69.2567 14.0977 69.4037L14.0366 69.4825L13.9449 69.5771C13.8736 70.1128 13.8379 70.5698 13.8379 70.948C13.9805 71.032 14.0519 71.1318 14.0519 71.2474C14.0519 71.426 13.9245 71.615 13.6698 71.8146C13.5985 71.8672 13.517 71.9197 13.4253 71.9722C13.354 72.0142 13.2522 72.051 13.1197 72.0825C12.9975 72.114 12.8752 72.1298 12.753 72.1298C12.3761 72.1298 12.2029 71.988 12.2335 71.7043L12.3557 70.3807C10.9906 71.053 9.94136 71.3892 9.20789 71.3892C8.28087 71.3892 7.81736 70.8744 7.81736 69.845C7.81736 68.8575 8.31143 68.0171 9.29958 67.3238C10.2979 66.6304 11.4898 66.0054 12.8752 65.4486C12.916 65.0389 12.9466 64.624 12.9669 64.2038C12.9669 64.1197 12.972 64.0147 12.9822 63.8886C12.9924 63.7626 12.9975 63.6208 12.9975 63.4632C12.9975 63.2636 12.9822 63.1323 12.9516 63.0692L12.9058 63.0062H12.8905C12.7377 63.0062 12.4525 63.2216 12.0348 63.6523C11.6579 64.0305 11.1893 64.5977 10.629 65.3541C10.5475 65.4696 10.41 65.5642 10.2164 65.6377C10.033 65.7112 9.84459 65.748 9.65103 65.748C9.50841 65.748 9.38617 65.7218 9.2843 65.6692C9.19261 65.6167 9.14677 65.5379 9.14677 65.4329C9.14677 65.3488 9.18752 65.2385 9.26902 65.102C10.6748 62.9169 12.045 61.8244 13.3795 61.8244Z"
          fill="#8179DC"
        />
        <path
          d="M20.5569 67.5759C20.5976 67.3973 20.618 67.1872 20.618 66.9456C20.618 66.1052 20.3124 65.2858 19.7012 64.4874C19.3548 64.0252 18.9881 63.6523 18.6009 63.3686C18.2953 65.3331 18.0559 66.9193 17.8828 68.1274C17.8013 68.6211 17.6892 69.3617 17.5466 70.3492C17.8522 70.4963 18.1323 70.5698 18.387 70.5698C18.8149 70.5698 19.202 70.3544 19.5483 69.9237C19.803 69.6086 20.017 69.2462 20.1901 68.8365C20.3633 68.4268 20.4856 68.0066 20.5569 67.5759ZM18.769 61.8402C19.4006 62.0608 19.9711 62.4337 20.4805 62.9589C20.9898 63.4737 21.3871 64.0777 21.6724 64.7711C21.9678 65.4539 22.1155 66.1367 22.1155 66.8195C22.1155 67.1872 22.0696 67.5444 21.978 67.891C21.7844 68.6159 21.489 69.2672 21.0917 69.845C20.7046 70.4122 20.236 70.8639 19.6859 71.2001C19.146 71.5257 18.5653 71.6886 17.9439 71.6886C17.7503 71.6886 17.5517 71.6728 17.3479 71.6413C16.9405 74.3306 16.5737 76.5261 16.2477 78.2279C16.207 78.4275 16.0644 78.5956 15.8199 78.7322C15.5754 78.8687 15.3258 78.937 15.0711 78.937C14.8979 78.937 14.7655 78.9002 14.6738 78.8267C14.572 78.7532 14.5363 78.6429 14.5669 78.4958C15.066 75.8906 15.5041 73.4061 15.881 71.0425L15.8504 71.0268C15.718 70.9322 15.6518 70.8272 15.6518 70.7116C15.6518 70.533 15.774 70.3649 16.0185 70.2074C16.3445 68.264 16.7112 65.769 17.1187 62.7226L16.9201 62.7383L16.752 62.7541C16.5788 62.7541 16.4515 62.7226 16.37 62.6596C16.2885 62.5965 16.2477 62.5177 16.2477 62.4232C16.2477 62.2656 16.3241 62.1133 16.4769 61.9662C16.6297 61.8192 16.8182 61.7246 17.0423 61.6826C17.2257 61.6511 17.4091 61.6353 17.5924 61.6353C17.7249 61.6353 17.9031 61.6458 18.1272 61.6668C18.4532 61.6248 18.6672 61.6826 18.769 61.8402Z"
          fill="#8179DC"
        />
        <path
          d="M28.7596 68.0959C28.8309 68.0223 28.9429 67.9646 29.0958 67.9225C29.2486 67.8805 29.4014 67.8595 29.5542 67.8595C29.9311 67.8595 30.1196 67.9593 30.1196 68.1589C30.1196 68.2534 30.0686 68.3585 29.9668 68.4741C29.8445 68.6211 29.7324 68.7629 29.6306 68.8995C29.5287 69.0256 29.437 69.1411 29.3555 69.2462C28.9073 69.845 28.5049 70.3229 28.1484 70.6801C27.7918 71.0268 27.3741 71.2789 26.8953 71.4365C26.6712 71.51 26.4318 71.5468 26.1772 71.5468C25.7493 71.5468 25.3826 71.4207 25.077 71.1686C24.7815 70.9165 24.6083 70.5488 24.5574 70.0656C24.537 69.929 24.5268 69.7189 24.5268 69.4353C24.5268 68.889 24.588 68.3322 24.7102 67.765C24.8325 67.1977 25.0107 66.4886 25.245 65.6377L25.4284 64.9601L24.8477 65.0232C24.5625 65.0442 24.1754 65.0862 23.6864 65.1492C23.4521 65.1807 23.2738 65.1545 23.1516 65.0704C23.0293 64.9864 22.9682 64.8761 22.9682 64.7395C22.9682 64.582 23.0395 64.4296 23.1822 64.2826C23.335 64.125 23.5285 64.0357 23.7628 64.0147L25.734 63.7783C26.1822 62.0765 26.6865 60.4062 27.2468 58.7675C27.2977 58.6204 27.4353 58.4943 27.6594 58.3893C27.8937 58.2737 28.1178 58.216 28.3317 58.216C28.4642 58.216 28.5711 58.2422 28.6526 58.2947C28.7443 58.3473 28.7901 58.426 28.7901 58.5311C28.7901 58.5626 28.78 58.6204 28.7596 58.7044C28.1687 60.4167 27.6747 62.0503 27.2774 63.605C27.9905 63.5315 28.4642 63.4947 28.6985 63.4947C28.9939 63.4947 29.1416 63.584 29.1416 63.7626C29.1416 63.9096 29.055 64.0725 28.8818 64.2511C28.7086 64.4191 28.5304 64.5242 28.347 64.5662C27.7358 64.6713 27.2774 64.7448 26.9717 64.7868C26.7986 65.5011 26.6458 66.1997 26.5133 66.8826C26.493 66.9666 26.4216 67.2765 26.2994 67.8122C26.1772 68.3375 26.116 68.8312 26.116 69.2934C26.116 69.8922 26.2688 70.2179 26.5745 70.2704C26.768 70.3019 26.987 70.1916 27.2315 69.9395C27.4862 69.6769 27.8122 69.2882 28.2095 68.7734C28.454 68.4478 28.6373 68.2219 28.7596 68.0959Z"
          fill="#8179DC"
        />
        <path
          d="M37.7315 62.7856C37.8028 62.6596 37.976 62.5282 38.251 62.3917C38.5362 62.2446 38.7858 62.1711 38.9998 62.1711C39.3054 62.1711 39.4378 62.3181 39.397 62.6123C39.397 62.6438 39.392 62.6911 39.3818 62.7541C39.3716 62.8171 39.3614 62.8644 39.3512 62.8959V62.9274C39.2493 63.6313 39.1322 64.4769 38.9998 65.4644C38.8775 66.4413 38.7807 67.2082 38.7094 67.765L38.3121 70.7904C38.2816 71.0005 38.1339 71.1791 37.869 71.3262C37.6143 71.4732 37.3545 71.5468 37.0897 71.5468C36.9267 71.5468 36.7943 71.51 36.6924 71.4365C36.6007 71.3629 36.565 71.2579 36.5854 71.1213C36.6975 70.2179 36.8757 68.8627 37.1202 67.0559L36.9674 67.3238C36.7026 67.786 36.5039 68.1221 36.3715 68.3322C35.9131 69.0676 35.4241 69.6874 34.9045 70.1916C34.3952 70.6959 33.8094 71.032 33.1473 71.2001C32.8926 71.2631 32.6634 71.2946 32.4596 71.2946C31.5021 71.2946 31.0233 70.6223 31.0233 69.2777C31.0233 68.6474 31.12 67.933 31.3136 67.1347C31.5072 66.3258 31.7262 65.5694 31.9707 64.8656C32.2253 64.1618 32.4444 63.626 32.6277 63.2583C32.699 63.1113 32.8569 62.9852 33.1014 62.8802C33.3561 62.7646 33.6006 62.7068 33.8349 62.7068C33.9775 62.7068 34.0896 62.7331 34.1711 62.7856C34.2628 62.8381 34.3086 62.9117 34.3086 63.0062C34.3086 63.0482 34.2933 63.1113 34.2628 63.1953C33.5802 64.7395 33.1371 66.1419 32.9333 67.4025L32.8569 67.828C32.7754 68.2692 32.7347 68.6054 32.7347 68.8365C32.7347 68.952 32.7398 69.0361 32.75 69.0886C32.8722 69.6243 33.0709 69.8765 33.3459 69.845C33.458 69.8344 33.5904 69.7347 33.7432 69.5456C33.9062 69.3565 34.0081 69.2409 34.0488 69.1989C34.548 68.6001 35.0013 67.9488 35.4088 67.245C35.8163 66.5306 36.29 65.6377 36.8299 64.5662C37.105 63.9884 37.4055 63.3949 37.7315 62.7856Z"
          fill="#8179DC"
        />
        <path
          d="M44.2263 61.7771C44.5218 61.6511 44.7917 61.588 45.0362 61.588C45.3011 61.588 45.515 61.6616 45.678 61.8086C45.841 61.9452 45.9225 62.1711 45.9225 62.4862C45.9225 62.7909 45.8766 63.1218 45.785 63.4789C45.6933 63.8361 45.5659 64.2563 45.4029 64.7395L45.189 65.4014C45.1279 65.6009 44.97 65.769 44.7153 65.9056C44.4606 66.0422 44.2161 66.1104 43.9818 66.1104C43.829 66.1104 43.7119 66.0789 43.6304 66.0159C43.5591 65.9424 43.5438 65.8373 43.5845 65.7007C43.7679 65.1125 43.9513 64.4612 44.1346 63.7468C44.1754 63.4212 44.206 63.2058 44.2263 63.1008L44.1652 63.1638C43.3808 63.8571 42.6626 64.729 42.0106 65.7795C41.7152 67.4498 41.5318 69.1254 41.4605 70.8062C41.4503 71.0058 41.3179 71.1843 41.0632 71.3419C40.8187 71.489 40.5641 71.5625 40.2992 71.5625C40.1464 71.5625 40.0191 71.5257 39.9172 71.4522C39.8153 71.3787 39.7695 71.2684 39.7797 71.1213C39.8612 69.6086 40.0191 68.1379 40.2534 66.7092C40.1515 66.6357 40.1006 66.5516 40.1006 66.4571C40.1006 66.3941 40.1209 66.3258 40.1617 66.2523L40.3909 65.8583C40.615 64.6502 40.8901 63.4369 41.216 62.2183C41.267 62.0293 41.4249 61.8664 41.6897 61.7299C41.9648 61.5828 42.2246 61.5093 42.4691 61.5093C42.6219 61.5093 42.739 61.5408 42.8205 61.6038C42.902 61.6668 42.9224 61.7614 42.8816 61.8874C42.7186 62.4757 42.6168 62.8644 42.576 63.0535C43.1872 62.4232 43.7373 61.9977 44.2263 61.7771Z"
          fill="#8179DC"
        />
        <path
          d="M50.2945 63.1165C49.775 63.5262 49.3522 64.188 49.0262 65.102C50.0246 64.7133 50.9261 64.3876 51.7309 64.125C51.3947 63.6418 51.0535 63.3161 50.7071 63.148C50.6358 63.1165 50.5645 63.0955 50.4932 63.085C50.4321 63.0745 50.3964 63.0692 50.3862 63.0692C50.3964 63.0798 50.3862 63.0903 50.3557 63.1008C50.3353 63.1113 50.3149 63.1165 50.2945 63.1165ZM50.3557 61.9977C50.5186 61.9557 50.6918 61.9347 50.8752 61.9347C51.8532 61.9347 52.7394 62.6123 53.534 63.9674C53.5646 64.0094 53.5799 64.062 53.5799 64.125C53.5799 64.2406 53.5086 64.3614 53.3659 64.4874C53.2539 64.6135 53.1113 64.7133 52.9381 64.7868C51.9194 65.249 50.5034 65.8005 48.6901 66.4413C48.5882 66.9771 48.5373 67.5286 48.5373 68.0959C48.5373 68.3585 48.5424 68.5476 48.5525 68.6631C48.5729 69.1359 48.6646 69.5456 48.8276 69.8922C48.8785 70.0078 48.9498 70.1181 49.0415 70.2231C49.1434 70.3282 49.2198 70.3965 49.2707 70.428C49.3013 70.449 49.3522 70.4595 49.4235 70.4595C49.4948 70.4595 49.5763 70.4385 49.668 70.3965C49.7699 70.3544 49.882 70.2967 50.0042 70.2231C50.2996 70.0445 50.5747 69.8397 50.8294 69.6086C51.084 69.3775 51.3896 69.0781 51.7462 68.7104C51.8888 68.5633 52.1282 68.4898 52.4644 68.4898C52.6478 68.4898 52.8006 68.5213 52.9228 68.5844C53.0552 68.6369 53.1214 68.7157 53.1214 68.8207C53.1214 68.9153 53.0705 69.0203 52.9686 69.1359C52.337 69.8397 51.6902 70.4385 51.028 70.9322C50.3658 71.426 49.7037 71.6728 49.0415 71.6728C48.7257 71.6728 48.4303 71.6045 48.1552 71.468C47.6968 71.2474 47.3657 70.8954 47.162 70.4122C46.9583 69.929 46.8564 69.3617 46.8564 68.7104C46.8564 68.2272 46.9175 67.6599 47.0398 67.0086L46.9175 67.0401L46.7953 67.0874C46.6425 67.1399 46.5202 67.1662 46.4285 67.1662C46.2859 67.1662 46.1739 67.1294 46.0924 67.0559C46.0109 66.9823 45.9701 66.8878 45.9701 66.7722C45.9701 66.6357 46.021 66.5044 46.1229 66.3783C46.235 66.2417 46.398 66.1314 46.6119 66.0474L47.3607 65.748C47.4523 65.4539 47.5899 65.0704 47.7732 64.5977C48.0585 63.9464 48.415 63.3844 48.8429 62.9117C49.2707 62.4389 49.775 62.1343 50.3557 61.9977Z"
          fill="#8179DC"
        />
        <path
          d="M61.6114 77.9128C61.5706 77.9338 61.5554 77.96 61.5655 77.9916C61.5655 77.9705 61.5808 77.9443 61.6114 77.9128ZM65.3857 62.2971C65.3857 62.0975 65.5029 61.9242 65.7372 61.7771C65.9715 61.6301 66.216 61.5565 66.4706 61.5565C66.6234 61.5565 66.7457 61.5933 66.8374 61.6668C66.9392 61.7299 66.9902 61.8349 66.9902 61.982C67.0004 62.5177 66.9647 63.043 66.8832 63.5577C66.8119 64.062 66.6897 64.7658 66.5165 65.6692C66.435 66.0474 66.379 66.3258 66.3484 66.5044C65.9918 68.4793 65.5538 70.5068 65.0342 72.5868C64.7592 73.7108 64.5096 74.63 64.2855 75.3443C64.0716 76.0691 63.8016 76.7625 63.4756 77.4243C63.2719 77.834 63.007 78.1964 62.681 78.5116C62.355 78.8372 62.0138 79 61.6572 79C61.4127 79 61.1733 78.9107 60.939 78.7322C60.3584 78.2699 60.0681 77.2667 60.0681 75.7225C60.0681 75.3023 60.0935 74.6982 60.1444 73.9104C60.1546 73.7108 60.282 73.5374 60.5265 73.3904C60.771 73.2433 61.0205 73.1698 61.2752 73.1698C61.6216 73.1698 61.7897 73.3063 61.7795 73.5795C61.7591 74.0627 61.7489 74.4304 61.7489 74.6825C61.7489 75.2603 61.7795 75.8223 61.8406 76.3685C61.8508 76.4316 61.8661 76.5366 61.8864 76.6837C61.917 76.8308 61.9527 76.9621 61.9934 77.0776C62.0342 76.9621 62.0902 76.8413 62.1615 76.7152C62.3754 76.232 62.5129 75.8906 62.5741 75.691C62.788 75.0502 63.0529 74.1205 63.3687 72.9019C63.6539 71.7779 63.8933 70.7694 64.0869 69.8765C63.5266 70.5803 62.9204 71.0163 62.2685 71.1843C61.9527 71.2579 61.7082 71.2946 61.535 71.2946C60.394 71.2946 59.8236 70.407 59.8236 68.6316C59.8236 67.287 60.1597 65.4591 60.8321 63.148C60.883 62.9589 61.0256 62.7909 61.2599 62.6438C61.4942 62.4862 61.7184 62.4074 61.9323 62.4074C62.2175 62.4074 62.3856 62.544 62.4365 62.8171C62.4569 62.9327 62.4213 63.1113 62.3296 63.3529C62.2379 63.5945 62.1819 63.7521 62.1615 63.8256C61.9985 64.4559 61.8864 64.9286 61.8253 65.2438L61.7489 65.5747C61.6267 66.1104 61.5248 66.5989 61.4433 67.0401C61.3618 67.4813 61.3211 67.9068 61.3211 68.3165C61.3211 69.0623 61.479 69.5823 61.7948 69.8765C61.8763 69.9605 61.973 70.0025 62.0851 70.0025C62.4111 70.0025 62.7422 69.7031 63.0783 69.1044C63.4145 68.4951 63.7558 67.7912 64.1021 66.9929C64.4485 66.1735 64.7185 65.4801 64.912 64.9129C65.1158 64.3351 65.2533 63.7573 65.3246 63.1795C65.345 62.9694 65.3653 62.6753 65.3857 62.2971Z"
          fill="#8179DC"
        />
        <path
          d="M74.1783 66.0947C74.1783 64.9812 73.5467 64.104 72.2835 63.4632C71.9677 63.7363 71.6519 64.0987 71.3361 64.5504C70.949 65.1282 70.6281 65.7743 70.3734 66.4886C70.2715 66.7722 70.1748 67.1609 70.0831 67.6547C69.9914 68.1379 69.9455 68.5896 69.9455 69.0098C69.9455 69.4405 70.0016 69.7872 70.1136 70.0498C70.2359 70.3019 70.4294 70.428 70.6943 70.428C70.9082 70.428 71.1578 70.3387 71.443 70.1601C72.2274 69.6874 72.8794 69.0991 73.399 68.3953C73.9185 67.6914 74.1783 66.9246 74.1783 66.0947ZM74.6061 63.2426C74.9729 63.5997 75.253 64.0042 75.4466 64.4559C75.6503 64.9076 75.7522 65.3856 75.7522 65.8898C75.7522 66.6147 75.5484 67.35 75.141 68.0959C74.8659 68.6001 74.4635 69.1306 73.9338 69.6874C73.4041 70.2441 72.8132 70.7169 72.1612 71.1055C71.5194 71.4837 70.9031 71.6728 70.3123 71.6728C69.9455 71.6728 69.5992 71.5888 69.2732 71.4207C68.5805 71.032 68.2341 70.3334 68.2341 69.325C68.2341 68.6001 68.392 67.807 68.7078 66.9456C69.0236 66.0737 69.3598 65.3383 69.7163 64.7395C70.5822 63.3214 71.494 62.4284 72.4516 62.0608C72.7164 61.9557 73.0017 61.9032 73.3073 61.9032C73.6638 61.9032 73.9643 61.9977 74.2088 62.1868C74.4533 62.3654 74.5959 62.649 74.6367 63.0377V63.1008C74.6367 63.1323 74.6265 63.1795 74.6061 63.2426Z"
          fill="#8179DC"
        />
        <path
          d="M83.0923 62.7856C83.1636 62.6596 83.3368 62.5282 83.6118 62.3917C83.897 62.2446 84.1466 62.1711 84.3605 62.1711C84.6662 62.1711 84.7986 62.3181 84.7579 62.6123C84.7579 62.6438 84.7528 62.6911 84.7426 62.7541C84.7324 62.8171 84.7222 62.8644 84.712 62.8959V62.9274C84.6101 63.6313 84.493 64.4769 84.3605 65.4644C84.2383 66.4413 84.1415 67.2082 84.0702 67.765L83.6729 70.7904C83.6424 71.0005 83.4946 71.1791 83.2298 71.3262C82.9751 71.4732 82.7153 71.5468 82.4505 71.5468C82.2875 71.5468 82.1551 71.51 82.0532 71.4365C81.9615 71.3629 81.9258 71.2579 81.9462 71.1213C82.0583 70.2179 82.2365 68.8627 82.481 67.0559L82.3282 67.3238C82.0634 67.786 81.8647 68.1221 81.7323 68.3322C81.2739 69.0676 80.7849 69.6874 80.2653 70.1916C79.756 70.6959 79.1702 71.032 78.5081 71.2001C78.2534 71.2631 78.0242 71.2946 77.8204 71.2946C76.8629 71.2946 76.3841 70.6223 76.3841 69.2777C76.3841 68.6474 76.4808 67.933 76.6744 67.1347C76.868 66.3258 77.087 65.5694 77.3315 64.8656C77.5861 64.1618 77.8052 63.626 77.9885 63.2583C78.0598 63.1113 78.2177 62.9852 78.4622 62.8802C78.7169 62.7646 78.9614 62.7068 79.1957 62.7068C79.3383 62.7068 79.4504 62.7331 79.5319 62.7856C79.6236 62.8381 79.6694 62.9117 79.6694 63.0062C79.6694 63.0482 79.6541 63.1113 79.6236 63.1953C78.941 64.7395 78.4979 66.1419 78.2941 67.4025L78.2177 67.828C78.1362 68.2692 78.0955 68.6054 78.0955 68.8365C78.0955 68.952 78.1006 69.0361 78.1108 69.0886C78.233 69.6243 78.4317 69.8765 78.7067 69.845C78.8188 69.8344 78.9512 69.7347 79.104 69.5456C79.267 69.3565 79.3689 69.2409 79.4096 69.1989C79.9088 68.6001 80.3621 67.9488 80.7696 67.245C81.1771 66.5306 81.6508 65.6377 82.1907 64.5662C82.4658 63.9884 82.7663 63.3949 83.0923 62.7856Z"
          fill="#8179DC"
        />
        <path
          d="M89.5871 61.7771C89.8826 61.6511 90.1525 61.588 90.397 61.588C90.6619 61.588 90.8758 61.6616 91.0388 61.8086C91.2018 61.9452 91.2833 62.1711 91.2833 62.4862C91.2833 62.7909 91.2374 63.1218 91.1457 63.4789C91.0541 63.8361 90.9267 64.2563 90.7637 64.7395L90.5498 65.4014C90.4887 65.6009 90.3308 65.769 90.0761 65.9056C89.8214 66.0422 89.5769 66.1104 89.3426 66.1104C89.1898 66.1104 89.0727 66.0789 88.9912 66.0159C88.9199 65.9424 88.9046 65.8373 88.9453 65.7007C89.1287 65.1125 89.3121 64.4612 89.4954 63.7468C89.5362 63.4212 89.5667 63.2058 89.5871 63.1008L89.526 63.1638C88.7416 63.8571 88.0234 64.729 87.3714 65.7795C87.076 67.4498 86.8926 69.1254 86.8213 70.8062C86.8111 71.0058 86.6787 71.1843 86.424 71.3419C86.1795 71.489 85.9249 71.5625 85.66 71.5625C85.5072 71.5625 85.3799 71.5257 85.278 71.4522C85.1761 71.3787 85.1303 71.2684 85.1405 71.1213C85.222 69.6086 85.3799 68.1379 85.6142 66.7092C85.5123 66.6357 85.4614 66.5516 85.4614 66.4571C85.4614 66.3941 85.4817 66.3258 85.5225 66.2523L85.7517 65.8583C85.9758 64.6502 86.2509 63.4369 86.5768 62.2183C86.6278 62.0293 86.7857 61.8664 87.0505 61.7299C87.3256 61.5828 87.5854 61.5093 87.8299 61.5093C87.9827 61.5093 88.0998 61.5408 88.1813 61.6038C88.2628 61.6668 88.2832 61.7614 88.2424 61.8874C88.0794 62.4757 87.9776 62.8644 87.9368 63.0535C88.548 62.4232 89.0981 61.9977 89.5871 61.7771Z"
          fill="#8179DC"
        />
        <path
          d="M96.7459 66.6304C96.5727 66.6514 96.4403 66.6357 96.3486 66.5832C96.2671 66.5306 96.2263 66.4518 96.2263 66.3468C96.2263 66.1892 96.3078 66.0211 96.4708 65.8426C96.644 65.664 96.8274 65.5642 97.0209 65.5432L98.549 65.3383C98.6101 64.3929 98.6814 63.6365 98.7629 63.0692C98.8444 62.502 98.9921 61.7824 99.206 60.9105C99.3588 60.3012 99.5269 59.7707 99.7103 59.319C99.8937 58.8568 100.159 58.4628 100.505 58.1372C100.851 57.8115 101.289 57.6487 101.819 57.6487C102.4 57.6487 102.807 57.9481 103.041 58.5469C103.154 58.4523 103.281 58.3788 103.424 58.3263C103.576 58.2737 103.724 58.2475 103.867 58.2475C104.193 58.2475 104.356 58.3788 104.356 58.6414C104.356 60.6899 104.305 63.7731 104.203 67.891L104.126 70.9795C104.116 71.1791 103.999 71.3524 103.775 71.4995C103.551 71.6466 103.322 71.7201 103.087 71.7201C102.761 71.7201 102.603 71.5835 102.614 71.3104C102.665 69.7767 102.7 67.9646 102.721 65.8741C101.834 66.0316 100.999 66.163 100.215 66.268L100.138 68.0644C100.057 69.8187 100.016 70.8009 100.016 71.011C100.006 71.2211 99.8733 71.4049 99.6186 71.5625C99.3639 71.7201 99.1042 71.7989 98.8393 71.7989C98.6763 71.7989 98.5439 71.7621 98.442 71.6886C98.3401 71.615 98.2892 71.5047 98.2892 71.3577C98.3096 70.4227 98.3758 68.7892 98.4879 66.4571L96.7459 66.6304ZM102.721 64.8026L102.736 62.8486C102.512 62.9537 102.303 63.0062 102.109 63.0062C101.957 63.0062 101.824 62.9747 101.712 62.9117C101.61 62.8381 101.559 62.7331 101.559 62.5965C101.559 62.3654 101.564 62.1658 101.575 61.9977C101.585 61.8297 101.595 61.6878 101.605 61.5723C101.636 61.2361 101.651 60.9 101.651 60.5638C101.651 60.2907 101.625 59.986 101.575 59.6499C101.554 59.5658 101.529 59.4713 101.498 59.3662C101.468 59.2612 101.447 59.1824 101.437 59.1299L101.422 59.0669C101.147 60.0018 100.943 60.7371 100.811 61.2729C100.678 61.8087 100.571 62.3864 100.49 63.0062C100.428 63.4159 100.383 63.7678 100.352 64.062C100.332 64.3456 100.311 64.6923 100.291 65.102L102.721 64.8026Z"
          fill="#8179DC"
        />
        <path
          d="M111.362 66.0947C111.362 64.9812 110.731 64.104 109.467 63.4632C109.152 63.7363 108.836 64.0987 108.52 64.5504C108.133 65.1282 107.812 65.7743 107.557 66.4886C107.455 66.7722 107.359 67.1609 107.267 67.6547C107.175 68.1379 107.129 68.5896 107.129 69.0098C107.129 69.4405 107.185 69.7872 107.298 70.0498C107.42 70.3019 107.613 70.428 107.878 70.428C108.092 70.428 108.342 70.3387 108.627 70.1601C109.411 69.6874 110.063 69.0991 110.583 68.3953C111.102 67.6914 111.362 66.9246 111.362 66.0947ZM111.79 63.2426C112.157 63.5997 112.437 64.0042 112.63 64.4559C112.834 64.9076 112.936 65.3856 112.936 65.8898C112.936 66.6147 112.732 67.35 112.325 68.0959C112.05 68.6001 111.647 69.1306 111.118 69.6874C110.588 70.2441 109.997 70.7169 109.345 71.1055C108.703 71.4837 108.087 71.6728 107.496 71.6728C107.129 71.6728 106.783 71.5888 106.457 71.4207C105.764 71.032 105.418 70.3334 105.418 69.325C105.418 68.6001 105.576 67.807 105.892 66.9456C106.207 66.0737 106.544 65.3383 106.9 64.7395C107.766 63.3214 108.678 62.4284 109.635 62.0608C109.9 61.9557 110.186 61.9032 110.491 61.9032C110.848 61.9032 111.148 61.9977 111.393 62.1868C111.637 62.3654 111.78 62.649 111.821 63.0377V63.1008C111.821 63.1323 111.81 63.1795 111.79 63.2426Z"
          fill="#8179DC"
        />
        <path
          d="M122.4 61.9977C122.492 61.8822 122.624 61.7929 122.797 61.7299C122.971 61.6668 123.144 61.6353 123.317 61.6353C123.48 61.6353 123.612 61.6668 123.714 61.7299C123.826 61.7824 123.882 61.8612 123.882 61.9662C123.882 62.0608 123.837 62.1711 123.745 62.2971C122.899 63.4527 122.191 64.7028 121.621 66.0474C121.061 67.3815 120.572 68.8627 120.154 70.491C120.113 70.6591 119.986 70.8062 119.772 70.9322C119.558 71.0478 119.339 71.1055 119.115 71.1055C118.952 71.1055 118.814 71.0688 118.702 70.9952C118.6 70.9217 118.544 70.8062 118.534 70.6486C118.442 69.6716 118.325 68.2482 118.183 66.3783C117.296 68.1852 116.614 69.6611 116.135 70.8062C116.094 70.9742 115.967 71.1213 115.753 71.2474C115.549 71.3629 115.34 71.4207 115.127 71.4207C114.994 71.4207 114.872 71.3892 114.76 71.3262C114.607 71.2736 114.531 71.1843 114.531 71.0583C114.531 71.0268 114.541 70.9795 114.561 70.9165C114.449 69.6243 114.312 67.6757 114.149 65.0704L113.996 62.7541C113.986 62.5545 114.098 62.3812 114.332 62.2341C114.566 62.087 114.816 62.0135 115.081 62.0135C115.234 62.0135 115.361 62.0503 115.463 62.1238C115.565 62.1868 115.621 62.2866 115.631 62.4232L115.967 67.6704C116.568 66.3888 117.235 65.0809 117.969 63.7468C117.979 63.5682 118.101 63.4107 118.335 63.2741C118.57 63.1375 118.809 63.0692 119.054 63.0692C119.247 63.0692 119.39 63.1165 119.482 63.2111C119.563 63.2846 119.599 63.3634 119.588 63.4474L119.604 63.4789C119.655 64.0987 119.741 65.1177 119.864 66.5359C120.587 64.7395 121.432 63.2268 122.4 61.9977Z"
          fill="#8179DC"
        />
        <path
          d="M9.31424 16.1223H17.7706V23.5348H9.55935V48.6139H0V14.6398C0 10.8511 1.103 7.84494 3.30901 5.62118C5.55586 3.39742 8.70146 2.28553 12.7458 2.28553C14.1756 2.28553 15.5237 2.45026 16.7901 2.77971C18.0974 3.06797 19.18 3.50037 20.0379 4.0769L17.5255 11.057C16.4225 10.2746 15.1356 9.8834 13.665 9.8834C10.7645 9.8834 9.31424 11.4894 9.31424 14.7015V16.1223Z"
          fill="#5D55B0"
        />
        <path
          d="M32.3083 19.7668C33.4521 18.1607 34.9841 16.9459 36.9041 16.1223C38.865 15.2987 41.1119 14.8869 43.6447 14.8869V23.7819C42.5826 23.6996 41.8676 23.6584 41.5 23.6584C38.7629 23.6584 36.6182 24.4408 35.0658 26.0057C33.5134 27.5294 32.7372 29.8355 32.7372 32.9241V48.6139H23.1779V15.381H32.3083V19.7668Z"
          fill="#5D55B0"
        />
        <path
          d="M78.1978 15.381V48.6139H69.0674V44.7841C66.698 47.6668 63.2664 49.1081 58.7727 49.1081C55.6679 49.1081 52.8492 48.408 50.3163 47.0079C47.8244 45.6077 45.8635 43.6105 44.4337 41.0161C43.0038 38.4217 42.2889 35.4155 42.2889 31.9975C42.2889 28.5795 43.0038 25.5733 44.4337 22.9789C45.8635 20.3845 47.8244 18.3872 50.3163 16.9871C52.8492 15.5869 55.6679 14.8869 58.7727 14.8869C62.9804 14.8869 66.269 16.2252 68.6384 18.902V15.381H78.1978ZM60.4272 41.2014C62.8375 41.2014 64.8392 40.3778 66.4324 38.7305C68.0257 37.0421 68.8223 34.7978 68.8223 31.9975C68.8223 29.1972 68.0257 26.9734 66.4324 25.3262C64.8392 23.6378 62.8375 22.7936 60.4272 22.7936C57.9761 22.7936 55.9539 23.6378 54.3607 25.3262C52.7674 26.9734 51.9708 29.1972 51.9708 31.9975C51.9708 34.7978 52.7674 37.0421 54.3607 38.7305C55.9539 40.3778 57.9761 41.2014 60.4272 41.2014Z"
          fill="#5D55B0"
        />
        <path
          d="M93.85 49.1081C91.1129 49.1081 88.4371 48.7787 85.8226 48.1198C83.208 47.4197 81.1246 46.5549 79.5722 45.5254L82.7587 38.607C84.2293 39.5542 86.0064 40.3366 88.0899 40.9543C90.1733 41.5308 92.2159 41.8191 94.2176 41.8191C98.262 41.8191 100.284 40.8102 100.284 38.7923C100.284 37.8452 99.7326 37.1657 98.6296 36.7539C97.5266 36.3421 95.8313 35.992 93.5436 35.7038C90.8474 35.2919 88.6209 34.8184 86.8643 34.283C85.1077 33.7477 83.5757 32.8005 82.2684 31.4415C81.002 30.0826 80.3688 28.1471 80.3688 25.6351C80.3688 23.5348 80.9612 21.6817 82.1459 20.0756C83.3714 18.4284 85.1281 17.1518 87.4158 16.2458C89.7444 15.3399 92.4814 14.8869 95.627 14.8869C97.9556 14.8869 100.264 15.1545 102.551 15.6899C104.88 16.1841 106.8 16.8841 108.312 17.7901L105.125 24.6467C102.225 22.9995 99.0586 22.1759 95.627 22.1759C93.5844 22.1759 92.0525 22.4641 91.0312 23.0407C90.0099 23.6172 89.4992 24.3584 89.4992 25.2644C89.4992 26.2939 90.0507 27.0146 91.1537 27.4264C92.2567 27.8382 94.0134 28.2294 96.4236 28.6001C99.1199 29.0531 101.326 29.5472 103.042 30.0826C104.757 30.5767 106.249 31.5033 107.515 32.8623C108.781 34.2212 109.415 36.1156 109.415 38.5452C109.415 40.6043 108.802 42.4368 107.576 44.0429C106.351 45.6489 104.553 46.9049 102.184 47.8109C99.8552 48.6757 97.0773 49.1081 93.85 49.1081Z"
          fill="#5D55B0"
        />
        <path
          d="M111.023 15.381H120.582V48.6139H111.023V15.381ZM115.803 10.7482C114.046 10.7482 112.616 10.2334 111.513 9.20391C110.41 8.17439 109.859 6.89779 109.859 5.3741C109.859 3.85041 110.41 2.5738 111.513 1.54428C112.616 0.514761 114.046 0 115.803 0C117.559 0 118.989 0.494171 120.092 1.48251C121.195 2.47085 121.747 3.70627 121.747 5.18878C121.747 6.79483 121.195 8.13321 120.092 9.20391C118.989 10.2334 117.559 10.7482 115.803 10.7482Z"
          fill="#5D55B0"
        />
        <path
          d="M141.771 41.3867C143.487 41.3867 144.999 41.1396 146.306 40.6455C147.654 40.1101 148.9 39.2865 150.044 38.1746L155.13 43.734C152.025 47.3167 147.49 49.1081 141.526 49.1081C137.809 49.1081 134.52 48.3874 131.66 46.9461C128.801 45.4636 126.595 43.4252 125.042 40.8308C123.49 38.2364 122.714 35.2919 122.714 31.9975C122.714 28.7442 123.47 25.8204 124.981 23.226C126.533 20.5904 128.637 18.552 131.293 17.1106C133.989 15.6281 137.012 14.8869 140.362 14.8869C143.507 14.8869 146.367 15.5663 148.941 16.9253C151.514 18.2431 153.557 20.1786 155.068 22.7318C156.621 25.2438 157.397 28.2294 157.397 31.6886L133.008 36.445C133.703 38.0922 134.786 39.3277 136.256 40.1513C137.768 40.9749 139.606 41.3867 141.771 41.3867ZM140.362 22.1759C137.952 22.1759 135.991 22.9583 134.479 24.5232C132.968 26.088 132.171 28.25 132.089 31.0091L148.144 27.8588C147.695 26.1292 146.776 24.7497 145.387 23.7201C143.998 22.6906 142.323 22.1759 140.362 22.1759Z"
          fill="#5D55B0"
        />
        <path
          d="M168.664 19.7668C169.807 18.1607 171.339 16.9459 173.259 16.1223C175.22 15.2987 177.467 14.8869 180 14.8869V23.7819C178.938 23.6996 178.223 23.6584 177.855 23.6584C175.118 23.6584 172.973 24.4408 171.421 26.0057C169.869 27.5294 169.093 29.8355 169.093 32.9241V48.6139H159.533V15.381H168.664V19.7668Z"
          fill="#5D55B0"
        />
      </svg>
    </Link>
  );
};

export default icon;
