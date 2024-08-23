import {useState} from "react";

export const ruLocale  = {
    //forms
    Loading: "Загрузка...",
    UserName: "Имя пользователя",
    Email: "Email",
    EmailNameRequiredMessage: "Необходимо ввести корректный эмейл",
    UserNameRequiredMessage: "Необходимо ввести имя пользователя",
    PasswordRequiredMessage: "Необходимо ввести пароль",
    PasswordConfirmationRequiredMessage: "Необходимо подтвердить пароль",
    LoginError: "Неверный логин или пароль",
    Password: "Пароль",
    ConfirmPassword: "Подтверждение пароля",
    Submit: "Подтвердить",
    NotSet: "Не задано",
    OK: "Ok",
    NO: "Нет",
    Save: "Сохранить",
    Saved: "Сохранено",
    Edit: "Редактировать",
    Delete: "Удалить",
    Archive: "Архивировать",
    Action: "Действия",
    SignIn: "Войти",
    Back: "Назад",
    Register: "Зарегистрироваться",
    LogOut: "Выйти",
    References: "Справочники",
    AdminPanel: "Панель администратора",
    Dashboard: "Статистика",
    PersonReference: "Сотрудник",
    GradeReference: "Грейд",
    ProjectReference: "Проект",
    MeetingReference: "1-2-1",
    TaskList: "Задачи",
    RoleReference: "Роль",
    PersonProjectsReference: "Проекты сотрудника",
    UserProjectsReference: "Проекты пользователя",
    UserReference: "Пользователь",
    AccessDeniedTitle: "Доступ запрещён",
    AccessDeniedMessage: "Пожалуйста авторизуйтесь или убедитесь что у вас есть права к данному разделу",
    Or: "Или",
    Profile: {
        Profile: "Профиль",
        CommonSettings: "Основные данные",
        MailSettings: "Настройки исходящей почты",
        Password: "Пароль",
    },

    Person: {
        Add: "Добавить сотрудника",
        Edit: "Редактирование сотрудника",
        DeleteTitle: "Удаление сотрудника",
        DeleteConfirmation: "Вы точно хотите удалить этого сотрудника?",
        ArchiveTitle: "Архивация сотрудника",
        ArchiveConfirmation: "Вы точно хотите заархивировать этого сотрудника?",
        LastName: "Фамилия",
        FirstName: "Имя",
        SurName: "Отчество",
        ShortName: "Короткое имя",
        Email: "Почта",
        Grade: "Грейд",
        SelectGradeQuery: "Выберите грейд...",
        EmailValidationError: "Введите валидный адрес почты",
        GradeValidationError: "Грейд не может быть пустым",
        NameValidationError: "Имя/Фамилия/Отчество/Короткое имя не могут быть пустыми",
        GreetingMail: "Приветственное письмо",
        SendGreetingMail: "Отправить"
    },
    Grade: {
        Add: "Добавить грейд",
        Edit: "Редактировать грейд",
        DeleteTitle: "Удалить грейд",
        DeleteConfirmation: "Вы уверены, что хотите удалить этот грейд?",
        GradeName: "Название",
        NameValidationError: "Название грейда не может быть пустым",
    },
    OneTwoOne: {
        Person: "Сотрудник",
        Grade: "Грейд",
        LastMeeting: "Дата последнего 1-2-1",
        DeadLine: "Дата следующего 1-2-1",
        DaysForDeadline: "Дней до следующего 1-2-1",
    },
    Project: {
        ProjectName: "Название проекта",
        Add: "Добавить проект",
        Edit: "Редактировать проект",
        DeleteTitle: "Удалить проект",
        DeleteConfirmation: "Вы уверены, что хотите удалить этот проект?",
        NameValidationError: "Название проекта не может быть пустым"
    },
    Meeting: {
        Person: "Сотрудник",
        PlannedDate: "Плановая дата",
        ActualDate: "Дата проведения",
        FollowUpWasSent: "Отправка Follow-up",
        Goals: {
            Goals: "Цели",
            Goal: "Цель",
            AddGoal: "Добавить цель",
            EditGoal: "Редактировать цель",
            DeleteTitle: "Удалить цель",
            DeleteConfirmation: "Вы уверены, что хотите удалить эту цель?",
        },
        Notes: {
            Notes: 'Заметки',
            Note: "Заметка",
            AddNote: "Добавить заметку",
            EditNote: "Редактировать заметку",
            DeleteTitle: "Удалить заметку",
            DeleteConfirmation: "Вы уверены, что хотите удалить эту заметку?",
        },
        ProcessingContent: {
            GenerateFollowUp: "Сгенерировать Follow-up",
            SendFollowUp: "Отправить Follow-Up",
        },
        PartOfFollowUp: "Участвует в обратной связи",
        Add: "Добавить встречу",
        Edit: "Редактировать встречу",
        Process: "Провести",
        Processing: "Проведение",
        DeleteTitle: "Удалить встречу",
        DeleteConfirmation: "Вы уверены, что хотите удалить эту встречу?",
        ClearFiltering: "Очистить",
        SelectPerson: "Выберите сотрудника...",
        PlanDateValidationError: "Плановая дата не может быть пустой",
        PersonValidationError: "Сотрудник не может быть пустым"
    },
    Task: {
        Description: "Задача",
        Complete: "Завершение",
        Person: "Сотрудник",
        MarkAsCompleted: "Завершить",
        CompleteTask: "Завершить задачу",
        CompleteTaskConfirmation: "Завершить выбранную задачу?",
        MeetingDate: "Дата встречи",
    },
    Role: {
        Add: "Добавить роль",
        Edit: "Редактировать роль",
        DeleteTitle: "Удалить роль",
        DeleteConfirmation: "Вы уверены, что хотите удалить эту роль?",
        RoleName: "Название роли",
        NameValidationError: "Название роли не может быть пустым"
    },
    PersonProject: {
        Person: "Имя сотрудника",
        Projects: "Проекты",
        Add: "Добавить проект",
        NameValidationError: "Укажите проект",
        AlreadyUsed: "Проект уже назначен",
    },
    UserProject: {
        UserName: "Имя пользователя",
        Email: "Email",
        Projects: "Проекты",
        Add: "Добавить проект",
        NameValidationError: "Укажите проект",
        AlreadyUsed: "Проект уже назначен",
    },
    User: {
        UserName: "Имя пользователя",
        Email: "Email",
        Role: "Роль",
        Edit: "Редактирование пользователя",
        DeleteTitle: "Удалить пользователя",
        DeleteConfirmation: "Вы уверены, что хотите удалить этого пользователя?",
        EmailValidationError: "Введите валидный email",
        NameValidationError: "Имя пользователя не может быть пустым",
        PasswordConfirmationError: "Не верное подтверждение пароля",
        CurrentPassValidationError: "Текущий пароль не может быть пустым",
        NewPassValidationError: "Новый пароль не может быть пустым",
        ConfirmPassValidationError: "Подтверждение пароля не может быть пустым",
        ChangePassword: "Смена пароля",
        CurrentPassword: "Текущий пароль",
        NewPassword: "Новый пароль",
        ConfirmPassword: "Подтвердить пароль",
        ForgotThePassword: "Забыли пароль?",
        RecoveryPasswordConfirmation: "Вы действительно хотите восстановить пароль?",
    },

    UserMailSettings: {
        DisplayName: "Выводимое имя",
        EmailPassword: "Email пароль",
        EmailHostAddress: "Адрес сервера",
        EmailPort: "Порт",
        DisplayNameError: "Введите выводимое имя",
        EmailPasswordError: "Введите пароль от email",
        EmailHostAddressError: "Введите адрес почтового сервера",
        EmailPortError: "Введите порт почтового cервера",
    },

    //Selectors
    GradeSelector: {
        Grade: "Грейд",
        SelectGradeQuery: "Выберите грейд...",
    },
    ProjectSelector: {
        Project: "Проект",
        SelectProjectQuery: "Выберите проект...",
    },
    RoleSelector: {
        Role: "Роль",
        SelectRoleQuery: "Выберите роль...",
    },
}