require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'commands',
        description: 'Sends all the available commands!',
    },
    {
        name: 'help',
        description: 'This command will send all information regarding the Bot and all of its commands!',
    },
    {
        name: 'rules',
        description: 'Rules!',
    },
    {
        name: 'clear',
        description: 'Deletes messages!',
        options: [
            {
                name: 'amount',
                description: 'Number of messages to delete',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ],
    },
    {
        name: 'youtube',
        description: 'Sends the YouTube link for RadioActive R’s Channel!',
    },
    {
        name: 'pandora',
        description: 'Open Pandora’s Box',
    },
    {
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two',
                        value: 2,
                    },
                    {
                        name: 'three',
                        value: 3,
                    },
                ],
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'hey',
        description: 'Replies with "hey!"'
    },
    {
        name: 'ping',
        description: 'Replies with "Pong!"'
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();
