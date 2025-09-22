function openEnvelope() {
            const envelope = document.getElementById('envelope');
            const content = document.getElementById('content');
            
            envelope.classList.add('opened');
            
            // Crear efecto de sparkles mágicos
            createSparkles();
            
            setTimeout(() => {
                content.classList.add('visible');
                
                // Añadir animación mágica a cada elemento
                const cards = content.querySelectorAll('.option-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('magic-reveal');
                    }, index * 200);
                });
                
                content.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }

        function acceptInvitation() {
            createConfetti();
            
            // Cambiar el texto del botón temporalmente
            const button = document.querySelector('.accept-button');
            const originalText = button.textContent;
            button.textContent = '¡Qué alegría! 💕';
            button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            
            // Mostrar la sección interactiva después del confeti
            setTimeout(() => {
                const interactiveSection = document.getElementById('interactiveSection');
                interactiveSection.classList.remove('hidden');
                interactiveSection.classList.add('visible');
                
                // Generar fechas disponibles
                generateAvailableDates();
                
                // Scroll suave hacia la sección interactiva
                interactiveSection.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
            }, 3000);
        }

        function generateAvailableDates() {
            const dateSelect = document.getElementById('dateSelect');
            const today = new Date();
            
            // Generar los próximos 14 días
            for (let i = 1; i <= 14; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                
                const option = document.createElement('option');
                option.value = date.toISOString().split('T')[0];
                
                const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                
                const dayName = dayNames[date.getDay()];
                const day = date.getDate();
                const month = monthNames[date.getMonth()];
                
                option.textContent = `${dayName} ${day} de ${month}`;
                dateSelect.appendChild(option);
            }
        }

        function confirmDate() {
            const dateSelect = document.getElementById('dateSelect');
            const timeSelect = document.getElementById('timeSelect');
            const activitySelect = document.getElementById('activitySelect');
            const messageInput = document.getElementById('messageInput');
            
            // Validar que se hayan seleccionado los campos obligatorios
            if (!dateSelect.value || !timeSelect.value || !activitySelect.value) {
                alert('Por favor completá la fecha, hora y actividad para confirmar nuestra cita 💕');
                return;
            }
            
            // Crear el resumen de la cita
            const selectedDate = new Date(dateSelect.value);
            const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                              'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            
            const formattedDate = `${dayNames[selectedDate.getDay()]} ${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`;
            const selectedTime = timeSelect.options[timeSelect.selectedIndex].text;
            const selectedActivity = activitySelect.options[activitySelect.selectedIndex].text;
            const personalMessage = messageInput.value;
            
            // Mostrar confirmación
            const confirmationMessage = document.getElementById('confirmationMessage');
            const dateDetails = document.getElementById('dateDetails');
            
            let detailsHTML = `
                <div class="detail-item">
                    <span class="detail-label">📅 Fecha:</span>
                    <span class="detail-value">${formattedDate}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">⏰ Hora:</span>
                    <span class="detail-value">${selectedTime}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">🎯 Actividad:</span>
                    <span class="detail-value">${selectedActivity}</span>
                </div>
            `;
            
            if (personalMessage) {
                detailsHTML += `
                    <div class="detail-item">
                        <span class="detail-label">💌 Mensaje:</span>
                        <span class="detail-value">"${personalMessage}"</span>
                    </div>
                `;
            }
            
            dateDetails.innerHTML = detailsHTML;
            
            // Ocultar formulario y mostrar confirmación
            document.getElementById('interactiveSection').style.display = 'none';
            confirmationMessage.classList.remove('hidden');
            confirmationMessage.classList.add('visible');
            
            // Más confeti para celebrar
            setTimeout(() => {
                createConfetti();
            }, 500);
            
            // Scroll hacia la confirmación
            confirmationMessage.scrollIntoView({ behavior: 'smooth' });
        }

        function shareDate() {
            const dateDetails = document.getElementById('dateDetails');
            const detailItems = dateDetails.querySelectorAll('.detail-item');
            
            let shareText = '💕 ¡Tenemos una cita confirmada! 💕\n\n';
            
            detailItems.forEach(item => {
                const label = item.querySelector('.detail-label').textContent;
                const value = item.querySelector('.detail-value').textContent;
                shareText += `${label} ${value}\n`;
            });
            
            shareText += '\n¡No puedo esperar a verte! 😊\n\n';
            shareText += '📞 Para confirmar: WhatsApp 358-4010796\n';
            shareText += '📸 Instagram: @ffeli.leal';
            
            // Intentar usar la API de compartir nativa si está disponible
            if (navigator.share) {
                navigator.share({
                    title: 'Nuestra cita especial 💕',
                    text: shareText
                }).catch(err => {
                    // Si falla, copiar al portapapeles
                    copyToClipboard(shareText);
                });
            } else {
                // Copiar al portapapeles como alternativa
                copyToClipboard(shareText);
            }
        }

        function copyToClipboard(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('¡Detalles copiados al portapapeles! 📋💕');
                }).catch(() => {
                    showTextToCopy(text);
                });
            } else {
                showTextToCopy(text);
            }
        }

        function showTextToCopy(text) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 500px;
                text-align: center;
            `;
            
            content.innerHTML = `
                <h3 style="margin-bottom: 20px; color: #d63384;">Copiá estos detalles:</h3>
                <textarea readonly style="width: 100%; height: 200px; padding: 15px; border: 2px solid #e9ecef; border-radius: 10px; font-family: inherit;">${text}</textarea>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px; padding: 10px 20px; background: #d63384; color: white; border: none; border-radius: 10px; cursor: pointer;">Cerrar</button>
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Seleccionar el texto automáticamente
            content.querySelector('textarea').select();
        }

        function createSparkles() {
            const sparklesContainer = document.getElementById('sparkles');
            sparklesContainer.classList.remove('hidden');
            
            // Crear sparkles mágicos alrededor del sobre
            for (let i = 0; i < 30; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = (45 + Math.random() * 10) + '%';
                sparkle.style.top = (40 + Math.random() * 20) + '%';
                sparkle.style.animationDelay = Math.random() * 1 + 's';
                sparklesContainer.appendChild(sparkle);
            }
            
            // Limpiar sparkles después de la animación
            setTimeout(() => {
                sparklesContainer.innerHTML = '';
                sparklesContainer.classList.add('hidden');
            }, 3000);
        }

        function createConfetti() {
            const confettiContainer = document.getElementById('confetti');
            confettiContainer.classList.remove('hidden');
            
            // Crear múltiples piezas de confeti
            for (let i = 0; i < 100; i++) {
                const confettiPiece = document.createElement('div');
                confettiPiece.className = 'confetti-piece';
                confettiPiece.style.left = Math.random() * 100 + '%';
                confettiPiece.style.animationDelay = Math.random() * 2 + 's';
                confettiPiece.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confettiContainer.appendChild(confettiPiece);
            }
            
            // Limpiar el confeti después de la animación
            setTimeout(() => {
                confettiContainer.innerHTML = '';
                confettiContainer.classList.add('hidden');
            }, 5000);
        }

        // Animación de scroll para revelar contenido
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const windowHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                
                if (scrollTop > (sectionTop - windowHeight + sectionHeight/2)) {
                    section.classList.add('visible');
                }
            });
        });

        // Efecto hover en las tarjetas de opciones
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });