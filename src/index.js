require('dotenv').config({ path: './config/.env' });

const prefix = 'b!';

const status = require('../config/status.js');

const { Client, IntentsBitField, EmbedBuilder, PermissionsBitField, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is now active!`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000);
});

client.on('interactionCreate', async (interaction) =>{
    if (!interaction.isChatInputCommand()) return;

    console.log(interaction.commandName);
    
    if (interaction.commandName === 'commands') {
        const embed = new EmbedBuilder()
            .setColor(0x39f500)
            .setTitle('Current Working and Usable "R.A.D Test Bot" Commands:')
            .setDescription('Prefix: `b!` (slash command system naman ni, pero e bilin ra nako na diha)')
            .addFields(
                { name: '/help', value: 'Sends a message to inform you about the bot’s features.' },
                { name: '/rules', value: 'Sends an embed containing the server’s rules.' },
                { name: '/clear', value: 'Deletes a specified number of messages from a channel.' },
                { name: '/youtube', value: 'Sends a link to RadioActive R’s YouTube channel.' },
                { name: '/pandora', value: 'Unleashes Pandora’s Box... use at your own risk!' }
            )
            .setThumbnail('https://i.imgur.com/eiL0HlV.jpeg')
            .setFooter({ text: "All Hail The RadioActive Empire!" });
    
        await interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'help') {
        await interaction.reply('Here is a link to a video that shows and explains the commands and features the Bot has to offer: <https://www.youtube.com/watch?v=dQw4w9WgXcQ>');
    }    

    if (interaction.commandName === 'rules') {
        const embed = {
            color: 0x39f500,
            title: 'Rules',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: 'This is an embed for The Server Rules!',
            fields: [
                { name: 'RULE 1', value: 'Keep things in their respective channels (memes go in #memes etc.) and don’t post anything like such in general chat (pics, unreadable fancy/corrupt text, etc.)' },
                { name: 'RULE 2', value: 'Pls don’t spam general chat with emotes (4 emotes max for message) or anything of the sorts it makes things hard for us to moderate.' },
                { name: 'RULE 3', value: 'Suicide talk / jokes will not be tolerated so pls keep that to dms or talk to professionals which I’m sure most of us are not.' },
                { name: 'RULE 4', value: 'No talk about politics either cause we all have our own opinions, same goes for really religious talk.' },
                { name: 'RULE 5', value: 'Please follow all the rules shown, and always remember to respect the staff and the decisions we make. We try our best to make the server run the best we can.' },
                { name: 'RULE 6', value: 'NSFW content is NOT allowed anywhere on the server, I repeat it is NOT allowed.' },
                { name: 'RULE 7', value: 'Do not disclose any information you know about RadioActive R and Yourself otherwise we will have to perma ban you. (If you had already taken 3 strikes) This is for the safety of both you and RadioActive R.' },
                { name: 'RULE 8', value: 'Alt account will be banned, so stick with the main one you use so staff won’t have trouble, result to having a Alt account will result in a ban for the Alt and a warning on the main.' },
                { name: 'RULE 9', value: 'Racial slur is not allowed, we don’t mind the f bomb, just don’t use it on others, and of course watch what you say.' },
                { name: 'RULE 10', value: 'Discord T.O.S says you must be over 13 to use this app, if we find any traces that you are under 13 we WILL ban you.' },
                { name: 'RULE 11', value: 'Voice chats are available for everyone so please behave while in it, Mic spamming after someone tells you to stop will be accounted for a warning for disrespect so if you are mic spamming by accident please use push to talk or a mod will have to take action.' },
                { name: 'RULE 12', value: 'This is a server with mostly English speaking people, so please try to only speak English.' },
                { name: 'RULE 13', value: 'I hate to mention this but please listen to a staff member when they are telling you something and don’t try to argue unless you ask politely to explain your view.' },
                { name: 'RULE 14', value: 'We DO NOT promote any underage illegal use such as Drinking and Drugs.' },
                { name: 'RULE 15', value: 'Follow all of these rules and we will have peace and order.' }
            ],
            thumbnail: {
                url: 'https://i.imgur.com/eiL0HlV.jpeg',
            },
            footer: {
                text: 'All Hail The RadioActive Empire!',
            },
        };
    
        await interaction.reply({ embeds: [embed] });
    }
    
    if (interaction.commandName === 'clear') {
        const amount = interaction.options.getInteger('amount');
    
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: '❌ You don’t have permission to use this command!', ephemeral: true });
        }
    
        if (!amount) {
            return interaction.reply({ content: '❌ Please specify the number of messages to delete!', ephemeral: true });
        }
    
        if (isNaN(amount)) {
            return interaction.reply({ content: '❌ That\'s not a valid number!', ephemeral: true });
        }
    
        if (amount > 100) {
            return interaction.reply({ content: '❌ You cannot delete more than 100 messages.', ephemeral: true });
        }
    
        if (amount < 1) {
            return interaction.reply({ content: '❌ You must delete at least one message.', ephemeral: true });
        }
    
        try {
            const fetched = await interaction.channel.messages.fetch({ limit: amount });
            await interaction.channel.bulkDelete(fetched);
    
            return interaction.reply({ content: `✅ Deleted ${fetched.size} messages!`, ephemeral: true });
        } catch (err) {
            console.error(err);
            return interaction.reply({ content: '❌ There was an error trying to delete messages!', ephemeral: true });
        }
    }

    if (interaction.commandName === 'youtube') {
        const embed = new EmbedBuilder()
        .setColor(0x39f500)
        .setDescription('YouTube')
        .addFields(
            {name: '', value: `**[RadioActive R](https://www.youtube.com/channel/UCRCNxSGRjVzU5BivONo62lQ)**` },
            {name: '', value: 'mmm...'},
        )
        .setThumbnail('https://yt3.googleusercontent.com/ytc/AIdro_mZSzdDTjrTg3joQVzzxIZ-ALeGjokOM-MNu-wpxdpAS3o=s160-c-k-c0x00ffffff-no-rj'); // Make sure to include .png or .jpg

        return interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'pandora') {
        const embed = new EmbedBuilder()
            .setColor(0x39f500)
            .setTitle('=======| You’ve Been Rick Rolled! |=======')
            .setImage('https://c.tenor.com/x8v1oNUOmg4AAAAd/tenor.gif')
            .setFooter({ text: 'Source: The Darn Internet.' });

        return interaction.reply({ embeds: [embed] });
    }

    // ======================Temp======================

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum is ${num1 + num2}`);
    }

    if (interaction.commandName === 'hey') {
        interaction.reply('hey!');
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('Pong!')
    }

    // ================================================

});

client.on('messageCreate', (message) => {
    console.log(message.content);

    if (message.author.bot) return;

    if (message.mentions.has(client.user)) {
        return message.reply("You rang? 🤖");
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'commands') {
        const embed = new EmbedBuilder()
            .setColor(0x39f500)
            .setTitle('Current Working and Usable "R.A.D Test Bot" Commands:')
            .setDescription('Prefix: `b!` (slash command system naman ni, pero e bilin ra nako na diha)')
            .addFields(
                { name: '/help', value: 'Sends a message to inform you about the bot’s features.' },
                { name: '/rules', value: 'Sends an embed containing the server’s rules.' },
                { name: '/clear', value: 'Deletes a specified number of messages from a channel.' },
                { name: '/youtube', value: 'Sends a link to RadioActive R’s YouTube channel.' },
                { name: '/pandora', value: 'Unleashes Pandora’s Box... use at your own risk!' }
            )
            .setThumbnail('https://i.imgur.com/eiL0HlV.jpeg')
            .setFooter({ text: "All Hail The RadioActive Empire!" });

        return message.reply({ embeds: [embed] });
    }

    if (command === 'help') {
        return message.reply('Here is a link to a video that shows and explains the commands and features the Bot has to offer: <https://www.youtube.com/watch?v=dQw4w9WgXcQ>');
    }

    if (command === 'rules') {
        const embed = new EmbedBuilder()
            .setColor(0x39f500)
            .setTitle('Rules')
            .setDescription('This is an embed for The Server Rules!')
            .addFields(
                { name: 'RULE 1', value: 'Keep things in their respective channels (memes go in #memes etc.) and don’t post anything like such in general chat (pics, unreadable fancy/corrupt text, etc.)' },
                { name: 'RULE 2', value: 'Pls don’t spam general chat with emotes (4 emotes max for message) or anything of the sorts it makes things hard for us to moderate.' },
                { name: 'RULE 3', value: 'Suicide talk / jokes will not be tolerated so pls keep that to dms or talk to professionals which I’m sure most of us are not.' },
                { name: 'RULE 4', value: 'No talk about politics either cause we all have our own opinions, same goes for really religious talk.' },
                { name: 'RULE 5', value: 'Please follow all the rules shown, and always remember to respect the staff and the decisions we make. We try our best to make the server run the best we can.' },
                { name: 'RULE 6', value: 'NSFW content is NOT allowed anywhere on the server, I repeat it is NOT allowed.' },
                { name: 'RULE 7', value: 'Do not disclose any information you know about RadioActive R and Yourself otherwise we will have to perma ban you. (If you had already taken 3 strikes)' },
                { name: 'RULE 8', value: 'Alt account will be banned, so stick with the main one you use so staff won’t have trouble.' },
                { name: 'RULE 9', value: 'Racial slur is not allowed, we don’t mind the f bomb, just don’t use it on others.' },
                { name: 'RULE 10', value: 'Discord T.O.S says you must be over 13 to use this app. If we find any traces you are under 13 we WILL ban you.' },
                { name: 'RULE 11', value: 'Mic spamming after someone tells you to stop will be accounted for a warning. Please behave in VCs.' },
                { name: 'RULE 12', value: 'This is a server with mostly English speaking people, so please try to only speak English.' },
                { name: 'RULE 13', value: 'Please listen to staff when they’re telling you something. Don’t argue aggressively.' },
                { name: 'RULE 14', value: 'We DO NOT promote underage illegal use such as drinking or drugs.' },
                { name: 'RULE 15', value: 'Follow all of these rules and we will have peace and order.' },
            )
            .setThumbnail('https://i.imgur.com/eiL0HlV.jpeg')
            .setFooter({ text: 'All Hail The RadioActive Empire!' });

        return message.reply({ embeds: [embed] });
    }

    // CLEAR (not implemented since it requires options & perms)
    if (command === 'clear') {
        return message.reply('❌ The `clear` command is only available as a slash command due to needing options and permissions.');
    }

    if (command === 'youtube') {
        const embed = new EmbedBuilder()
            .setColor(0x39f500)
            .setDescription('YouTube')
            .addFields(
                {name: '', value: `**[RadioActive R](https://www.youtube.com/channel/UCRCNxSGRjVzU5BivONo62lQ)**` },
                {name: '', value: 'mmm...'},
            )
            .setThumbnail('https://yt3.googleusercontent.com/ytc/AIdro_mZSzdDTjrTg3joQVzzxIZ-ALeGjokOM-MNu-wpxdpAS3o=s160-c-k-c0x00ffffff-no-rj'); // Make sure to include .png or .jpg

        return message.reply({ embeds: [embed] });
    }

    if (command === 'pandora') {
        const embed = new EmbedBuilder()
            .setColor(0x39f500)
            .setTitle('=======| You’ve Been Rick Rolled! |=======')
            .setImage('https://c.tenor.com/x8v1oNUOmg4AAAAd/tenor.gif')
            .setFooter({ text: 'Source: The Darn Internet.' });

        return message.reply({ embeds: [embed] });
    }

    // ======================Temp======================

    if (command === 'hey') {
        return message.reply('hey!');
    }

    if (command === 'ping') {
        return message.reply('Pong!');
    }

    // ================================================

});


client.login(process.env.TOKEN);
