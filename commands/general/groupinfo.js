/**
 * Group Info Command - Display group information
 */

module.exports = {
    name: 'groupinfo',
    aliases: ['info', 'ginfo'],
    category: 'general',
    description: 'Show group information',
    usage: '.groupinfo',
    groupOnly: true,
    
    async execute(sock, msg, args, extra) {
      try {
        const metadata = extra.groupMetadata;
        
        const admins = metadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
        const members = metadata.participants.filter(p => !p.admin);
        
        let text = `📋 *GROUP INFORMATION*\n\n`;
        text += `🏷️ 𝙽𝚊𝚖𝚎       : ${metadata.subject}\n`;
        text += `🆔 𝙸𝙳         : ${metadata.id}\n`;
        text += `👥 𝙼𝚎𝚖𝚋𝚎𝚛𝚜    : ${metadata.participants.length}\n`;
        text += `👑 𝙰𝚍𝚖𝚒𝚗𝚜     : ${admins.length}\n`;
        text += `📝 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${metadata.desc || 'No description'}\n`;
        text += `🔒 𝚁𝚎𝚜𝚝𝚒𝚛𝚌𝚝𝚎𝚍 : ${metadata.restrict ? 'Yes' : 'No'}\n`;
        text += `📢 𝙰𝚗𝚗𝚘𝚞𝚗𝚌𝚎   : ${metadata.announce ? 'Yes' : 'No'}\n`;
        text += `📅 𝙲𝚛𝚎𝚊𝚝𝚒𝚘𝚗   : ${new Date(metadata.creation * 1000).toLocaleDateString()}\n\n`;
        text += `👑 𝙰𝚍𝚖𝚒𝚗      :\n`;
        
        admins.forEach((admin, index) => {
          text += `${index + 1}. @${admin.id.split('@')[0]}\n`;
        });
        
        await sock.sendMessage(extra.from, {
          text,
          mentions: admins.map(a => a.id)
        }, { quoted: msg });
        
      } catch (error) {
        await extra.reply(`❌ Error: ${error.message}`);
      }
    }
  };
  
